---
title: Configuration
---

[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/stable/guide/guagua/)

### guagua.worker.number

How many workers in such job? It is set by Guagua, user can set it, but it just a hint.

### guagua.iteration.count

How many iterations or maximal iteration number. It is set by using '-c'.

### guagua.worker.computable.class

Worker class, must implement `ml.shifu.guagua.worker.WorkerComputable` interface. 

### guagua.master.computable.class

Master class, must implement `ml.shifu.guagua.master.MasterComputable` interface.

### guagua.master.result.class

Master result class, must implement `ml.shifu.guagua.io.Bytable` interface or extend `ml.shifu.guagua.io.HaltBytable` class.

### guagua.worker.result.class

Worker result class, must implement `ml.shifu.guagua.io.Bytable` interface or extend `ml.shifu.guagua.io.HaltBytable` class.

### guagua.master.intercepters

User defined master interceptors, separated by ',' if you have multiple interceptor. All interceptors must implement `ml.shifu.guagua.master.MasterInterceptor` interface.

### guagua.worker.intercepters

User defined worker interceptors, separated by ',' if you have multiple interceptor. All interceptors must implement `ml.shifu.guagua.worker.WorkererInterceptor` interface.

### guagua.master.system.intercepters

System master interceptors, default is 'ml.shifu.guagua.master.MasterTimer,ml.shifu.guagua.master.MemoryStatsMasterInterceptor,ml.shifu.guagua.master.SyncMasterCoordinator'

### guagua.worker.system.intercepters

System worker interceptors, default is 'ml.shifu.guagua.worker.WorkerTimer,ml.shifu.guagua.worker.MemoryStatsWorkerInterceptor,ml.shifu.guagua.worker.SyncWorkerCoordinator'.

### guagua.zk.servers


zookeeper servers. For example 'server1:port1,server2:port2'.

### guagua.zk.session.timeout

zookeeper session timeout, default is 5 * 60 * 1000 ms.

### guagua.zk.max.attempt

If zookeeper gets connection loss exception, max attempt number. By default is 5.

### guagua.zk.retry.wait.mills

If zookeeper gets connection loss exception, waiting time mills before next connection.

### guagua.input.dir

Input folder.

### guagua.zk.cleanup.enable

Whether clean znodes resources when job ends, default is true. 

### guagua.master.io.serializer

Master serializer class to serialize master results, must implement interface `ml.shifu.guagua.io.serializer` By default is 'ml.shifu.guagua.io.BytableSerializer'.

### guagua.worker.io.serializer

Worker serializer class to serialize master results, must implement interface `ml.shifu.guagua.io.serializer` By default is 'ml.shifu.guagua.io.BytableSerializer'.

### guagua.worker.halt.enable

Whether support halt if master or worker get some condition like error converged. By default is true.

### guagua.split.combinable & guagua.split.maxCombinedSplitSize

It is like pig, whether to combine splits together to get a number of byte set by 'guagua.split.maxCombinedSplitSize'.

### guagua.zk.heartbeat.enable

Whether to enable zookeeper hearbeat, default is false since ZooKeeper client provided by zookeeper has heartbeat.

### guagua.computation.time.threshold

If one worker computation time is over this number three times. The task will be killed by itself and fail-over will start another task. This is useful to check slow nodes and make task run on another nodes. By default is 40s.

### guagua.min.workers.ratio & guagua.min.workers.timeout

How many workers done in each iteration. If set it to 50%, half of all workers are done in one iteration and time is over 'guagua.min.workers.timeout', master will start another iteration without waiting for other un-ended tasks. By default is 1. 

Below is Guagua-YARN related.

### guagua.yarn.master.priority

Guagua AppMaster container priority.

### guagua.yarn.queue.name

queue name set in Guagua-YARN.

### guagua.yarn.app.name

Application name set by users.

### guagua.yarn.input.dir

Input folder, By using GuaguaYarnClient with '-i' the same with 'GuaguaMapReduceClient'.

### guagua.yarn.app.lib.jar

Lib jars used in YARN tasks.

### guagua.yarn.app.jar

App jars used in YARN application master.

### guagua.yarn.master.memory

Guagua AppMaster memory, default is 1024 (MB).

### guagua.yarn.master.args

Guagua AppMaster java command args.

### guagua.child.memory

App container task memory setting, by default is 1024(MB)

### guagua.yarn.container.args

App container java command args.

### guagua.yarn.max.container.attempts

Like 'mapred.mapper.max.attempts', by default is 4.

### guagua.yarn.master.vcores

Guagua AppMaster vcores.

### guagua.yarn.task.vcores

App container vcores.

### guagua.yarn.status.rpc.port

A Netty-RPC server is started in AppMaster to accumulate info like progress. We can set the port of ther server.