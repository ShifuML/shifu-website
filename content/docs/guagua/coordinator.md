---
title: Coordinators
---



[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/guagua/)

Coordinators
============

Coordinators are used to coordinate master and workers in each iteration. For example, at each iteration, master will send commands to each workers to start current iteration, and only master can say that 'yes, this iteration ends successful' and all master and workers can start next iteration. There are two kinds of coordinators in Guagua: master coordinator and worker coordinator. These coordinators are interceptors in fact and can be configurated through `guagua.system.master.interceptors` and `guagua.system.worker.interceptors` if you'd like to have another replacement coordination implementation.

Master Coordinator
---------

## preApplication

In `preApplication`, it will register to ZooKeeper by creating `/_guagua/<job_id>/master/0` node. And then wait for all workers registered in ZooKeeper.

## preIteration

In `preIteration`, the logic is waiting until all workers done by listening all workers' znodes in ZooKeeper. The work znode is like `/_guagua/<job_id>/worker/<iteration>/<id>`, when all workers` znodes are created, master coordinator will end blocking and start master computing.

## postIteration

In `postIteration`, master result will be written into `/_guagua/<job_id>/master/<iteration>`.

## postApplication

In `postApplication`, master will wait for all workers' cleaning resources. When all workers complete cleaning resources, it will create a node `/_guagua/<job_id>/master/<max iteration>`. Master will clean job resources when it receives all workers' cleaning messages.

Worker Coordinator
---------

## preApplication

In `preApplication`, it will register to ZooKeeper by creating `/_guagua/<job_id>/worker/0/<id>` node. And then wait for master initialization znode `/_guagua/<job_id>/master/0`.

## preIteration

In `preIteration`, every worker starts worker computation and when worker is done in current iteration.

## postIteration

In `postIteration`,  it will write its results into `/_guagua/<job_id>/worker/<iteration>`. And wait for master znode in current iteration. When gets master result, set it into WorkerContext and then end blocking.

## postApplication

In `postApplication`, worker cleans all znodes resources and create a node `/_guagua/<job_id>/worker/<max iteration>/<id>`. And then ends until all interceptors are gone through.