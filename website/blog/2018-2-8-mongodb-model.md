---
author: 木渔
authorURL: https://github.com/muyus
title: Mongodb模型关系设计原则
authorFBID: 100024348750176
---

* 一对一 内嵌关系模型
* 一对多 内嵌关系模型
* 一对多 引用模型

> 核心原则：对具有共享性的数据模型进行数据集合拆分，其它情况尽量使用同一集合，减少多表查询操作。

## 一对一 内嵌关系模型
应用场景：内嵌的对象是独有，不具有共享性
```
{
   _id: "joe",
   name: "Joe Bookreader",
   address: {
              street: "123 Fake Street",
              city: "Faketon",
              state: "MA",
              zip: "12345"
            }
  }
```
<!--truncate-->

## 一对多 内嵌关系模型
应用场景：内嵌的对象是独有，不具有共享性。
```
{
   _id: "joe",
   name: "Joe Bookreader",
   addresses: [
                {
                  street: "123 Fake Street",
                  city: "Faketon",
                  state: "MA",
                  zip: "12345"
                },
                {
                  street: "1 Some Other Street",
                  city: "Boston",
                  state: "MA",
                  zip: "12345"
                }
              ]
 }
```

## 一对多 引用模型
应用场景：一端具有共享性，多端通过外键与一端进行关联
```
{
   _id: "oreilly",
   name: "O'Reilly Media",
   founded: 1980,
   location: "CA"
}

{
   _id: 123456789,
   title: "MongoDB: The Definitive Guide",
   author: [ "Kristina Chodorow", "Mike Dirolf" ],
   published_date: ISODate("2010-09-24"),
   pages: 216,
   language: "English",
   publisher_id: "oreilly"
}

{
   _id: 234567890,
   title: "50 Tips and Tricks for MongoDB Developer",
   author: "Kristina Chodorow",
   published_date: ISODate("2011-05-06"),
   pages: 68,
   language: "English",
   publisher_id: "oreilly"
}
```

优惠

[![阿里云首购8折优惠](http://muyus.oss-cn-beijing.aliyuncs.com/aliyun/%E9%A6%96%E8%B4%AD8%E6%8A%981000-60.png "阿里云首购8折优惠")](https://promotion.aliyun.com/ntms/act/ambassador/sharetouser.html?userCode=d2bitiiq&utm_source=d2bitiiq "阿里云首购8折优惠")
