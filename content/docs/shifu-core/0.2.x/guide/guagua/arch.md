---
title: Architecture and Components
---

[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/stable/guide/guagua/)

![guagua-architecture](../images/guagua-arch.png)

Overview
---------

Four components in our system: Core, MapReduce-Adapter, YARN-Adapter, Consistent Client.

## Core

Core is abstract layer for our distributed training framework, it can be used in any distributed resource management platform, such as YARN, Mesos, even in MapReduce.

It includes:

* Core interfaces defined such as MasterComputable, WorkerComputable.
* Core interceptor interfaces defined for user to do something before or after each iteration.
* Master-Workers implementation to run MasterComputable, WorkerComputable and interceptors.
* Fail-over implementation: It includes: master fail-over mechanism(recover to last checkpoint), worker-failover(checkpoint mechanism to recover to last checkpoint).
* Coordination implementation: How to determine each worker is complete in one iteration? How to start a new iteration for all workers. Sync: using ZooKeeper, using loop to wait for the notification znodes. Async: using ZooKeeper, all server and workers are listeners for the specifiled znodes in ZooKeeper.

## MapReduce Adapter

This component is used to make our distributed training work on Hadoop MapReduce model(especially in hadoop 1).
Details are hidden to create a MapReduce Job, to determine one mapper as Master, other mappers as workers(Only mapper tasks)
Users can use it to launch distributed training on any platform to support Hadoop MapReduce model(hadoop version 1 and version 2)
This implemenatation is the default choice and tested on PayPal Hadoop cluster with a big data set about 1TB. 

## YARN Adapter

Compare with MapReduce Adapter, this component is to make our framework also work on YARN cluster.
Details are hidden to create a Yarn application, to launch an AppMaster and to launch containers as master and workers. 
YARN Adater is still in beta version since no web-ui like MapReduce in YARN, not tested with a big data set.

## Consistent Client

Don't need to care the real platform, consistent client will help you to launch your Guagua application by choosing MapReduce or YARN adapter, even other platform in the future.
