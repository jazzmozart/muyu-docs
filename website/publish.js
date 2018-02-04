#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

const siteConfig = require(process.cwd() + '/siteConfig.js');
const GIT_USER = 'muyus';
const CURRENT_BRANCH =
  process.env.CIRCLE_BRANCH || shell.exec('git rev-parse --abbrev-ref HEAD');
const ORGANIZATION_NAME =
  siteConfig.organizationName ||
  process.env.ORGANIZATION_NAME ||
  process.env.CIRCLE_PROJECT_USERNAME;
const PROJECT_NAME =
  siteConfig.projectName ||
  process.env.PROJECT_NAME ||
  process.env.CIRCLE_PROJECT_REPONAME;
const IS_PULL_REQUEST =
  process.env.CI_PULL_REQUEST || process.env.CIRCLE_PULL_REQUEST;
const USE_SSH = process.env.USE_SSH;
// github.io indicates organization repos that deploy via master. All others use gh-pages.
const DEPLOYMENT_BRANCH =
  PROJECT_NAME.indexOf('.github.io') !== -1 ? 'master' : 'gh-pages';

let remoteBranch;
if (USE_SSH === 'true') {
  remoteBranch = `git@github.com:${ORGANIZATION_NAME}/${PROJECT_NAME}.git`;
} else {
  remoteBranch = `https://${GIT_USER}@github.com/${ORGANIZATION_NAME}/${PROJECT_NAME}.git`;
}

shell.exec(`npm run build`);

shell.cd(process.cwd());
shell.cd('build');

shell.exec(`git clone ${remoteBranch} ${PROJECT_NAME}-${DEPLOYMENT_BRANCH}`);

shell.cd('../');

fromPath = path.join('build', `${PROJECT_NAME}`);
toPath = path.join('build', `${PROJECT_NAME}-${DEPLOYMENT_BRANCH}`);
// In github.io case, project is deployed to root. Need to not recursively
// copy the deployment-branch to be.
excludePath = `${PROJECT_NAME}-${DEPLOYMENT_BRANCH}`;

// cannot use shell.cp because it doesn't support copying dotfiles and we
// need to copy directories like .circleci, for example
// https://github.com/shelljs/shelljs/issues/79
fs.copy(
  fromPath,
  toPath,
  (src, dest) => {
    if (src.indexOf('.DS_Store') !== -1) {
      return false;
    }
    if (src.indexOf(excludePath) !== -1) {
      return false;
    }

    return true;
  },
  error => {
    if (error) {
      shell.echo(`Error: Copying build assets failed with error '${error}'`);
      shell.exit(1);
    }

    shell.cd(path.join('build', `${PROJECT_NAME}-${DEPLOYMENT_BRANCH}`));

    const currentCommit = shell.exec('git rev-parse HEAD').stdout.trim();

    shell.exec('git add --all');

    const commitResults = shell.exec(
      `git commit -m "Deploy website" -m "Deploy website version based on ${currentCommit}"`
    );
    if (shell.exec(`git push origin ${DEPLOYMENT_BRANCH}`).code !== 0) {
      shell.echo('Error: Git push failed');
      shell.exit(1);
    } else if (commitResults.code === 0) {
      // The commit might return a non-zero value when site is up to date.
      shell.echo(
        `Website is live at: https://${ORGANIZATION_NAME}.github.io/${PROJECT_NAME}`
      );
      shell.exit(0);
    }
  }
);
