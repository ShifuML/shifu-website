---
title: Profilers
---

[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/stable/guide/guagua/)

All profilers in **Guagua** are implemented as interceptors.

Memory
---------

Memory profiler is installed as system interceptor by default which is used to print memory consumption before and after each iteration.

	#!java
	ml.shifu.guagua.worker.MemoryStatsWorkerInterceptor 
	ml.shifu.guagua.master.MemoryStatsMasterInterceptor

Timer
---------

Timer is installed as system interceptor by default which is used to print time consumption for each iteration and whole application.

	#!java
	ml.shifu.guagua.worker.WorkerTimer 
	ml.shifu.guagua.master.MasterTimer

Tracer
---------

Tracer is not installed as default which is used to print context for each iteration with debugging level.
To enable it in master:

	#!java	
	-Dguagua.master.system.intercepters=ml.shifu.guagua.master.MasterTimer,ml.shifu.guagua.master.MemoryStatsMasterInterceptor,ml.shifu.guagua.master.SyncMasterCoordinator,ml.shifu.guagua.master.TraceMasterInterceptor

To enable it in worker:

	#!java	
	-Dguagua.worker.system.intercepters=ml.shifu.guagua.worker.WorkerTimer,ml.shifu.guagua.worker.MemoryStatsWorkerInterceptor,ml.shifu.guagua.worker.SyncWorkerCoordinator,ml.shifu.guagua.worker.TraceWorkerInterceptor
