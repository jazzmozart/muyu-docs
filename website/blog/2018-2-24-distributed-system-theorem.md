---
author: 木渔
authorURL: https://github.com/muyus
title: 分布式系统设计数据一致性相关理论
authorFBID: 100024348750176
---

* ACID
* CAP
* BASE

<!--truncate-->

## ACID
关系型数据库具有解决复杂事务场景的能力，关系型数据库的事务满足 ACID 的特性。

1. Atomicity：原子性（要么都做，要么都不做）
2. Consistency：一致性（数据库只有一个状态，不存在未确定状态）
3. Isolation：隔离性（事务之间互不干扰）
4. Durability： 永久性（事务一旦提交，数据库记录永久不变）

具有 ACID 特性的数据库支持数据的强一致性，保证了数据本身不会出现不一致。

## CAP
为了保证模块的分区容错性（P），只能在数据强一致性（C）和可用性（A）之间做平衡

1. 一致性（Consistency） （等同于所有节点访问同一份最新的数据副本）
2. 可用性（Availability）（每次请求都能获取到非错的响应——但是不保证获取的数据为最新数据）
3. 分区容错性（Partition tolerance）（以实际效果而言，分区相当于对通信的时限要求。系统如果不能在时限内达成数据一致性，就意味着发生了分区的情况，必须就当前操作在C和A之间做出选择。）

## BASE
解决 CAP 理论中分布式系统的可用性和一致性不可兼得的问题，牺牲强一致性来保证系统可用性，达到**最终一致性**。

BA：Basically Available，基本可用。
S：Soft State，软状态，状态可以有一段时间不同步。
E：Eventually Consistent，最终一致，最终数据是一致的就可以了，而不是时时保持强一致。


优惠

[![阿里云首购8折优惠](http://muyus.oss-cn-beijing.aliyuncs.com/aliyun/%E9%A6%96%E8%B4%AD8%E6%8A%981000-60.png "阿里云首购8折优惠")](https://promotion.aliyun.com/ntms/act/ambassador/sharetouser.html?userCode=d2bitiiq&utm_source=d2bitiiq "阿里云首购8折优惠")
