---
title: What's New - 0.3.0
---

What's New
==========

PMML
----

Supported PMML features:

* [FULL] DataDictionary
* [FULL] MiningSchema 
* [PARTIAL] Transformation 
    * [ZERO] TransformationDictionary 
    * [DONE] LocalTransformations
    * [PARTIAL] DerivedField 
* [PARTIAL] ModelStats 
    * [PATRIAL] UnivariateStats
    * [ZERO] MultivariateStats 
* [ZERO] Taxomony
* [PARTIAL] Targets
* [ZERO] Output
* [ZERO] ModelVerification
* [ZERO] ModelExplanation
* [ZERO] Segmentation(Multiple Models)
* [FULL] NeuralNetwork
* [ZERO]  (all other models)


Dependency Injection
--------------------

The framework is re-designed so that user defined implementations can be injected. Dependency injection may happend at various levels:

1. RequestProcessor Level: the framework no longer defines the available "step"s, previously called "stats", "normalize", "train", etc. User-defined RequestProcessor will decide WHAT to do(stats, normalize, train) and WHERE to execute the job(local, Hadoop cluster via Pig script, Spark, etc)

2. Task Level: each RequestProcessor may perform one or more tasks; each task has its own implementation and params. 

3. Sub-Task or Per-Field Settings: inside a task there could be injectable subtasks; or different data fields can use different settings, e.g. use ZScore normalization for some fields while WOE for the rest.

Check-out the next section for examples




New Request Format
------------------

The new Request format will replace the old ModelConfig file.

[Request Format](../user/request)

Repository Break-up
-------------------

* shifu-core
* shifu-plugin-encog
* shifu-plugin-spark

TODO: 

* extract pig related scripts and udf to shifu-plugin-pig
* extract guagua related code to shifu-plugin-guagua
* extract akka related code to shifu-plugin-akka
* remove Hadoop, Pig, Akka, Guagua dependencies from shifu-core


TODO
----

### ModelExec(Scoreing)

Currently only local scoring

* Offline batch scoring using Pig, Akka, Spark, or Hama
* Online scoring performance test(PMML overhead, online normalization overhead)

### ModelEval(Calculate performance metrics)

* Generate curves based on different metrics(currently sample on actionRate)
* Provide result in PMML's ModelExplanation(http://www.dmg.org/v4-2-1/ModelExplanation.html) IN ADDITION to the current JSON format(we need JSON format for visualization)
* Visualize the curves

https://github.com/ShifuML/shifu/blob/develop/shifu-core/src/main/java/ml/shifu/core/di/builtin/processor/ModelExecRequestProcessor.java

https://github.com/ShifuML/shifu/blob/develop/shifu-core/src/main/java/ml/shifu/core/di/builtin/processor/ModelEvalRequestProcessor.java



<!--
Appendix A: SPIs and Impls
--------------------------

### RequestProcessor

* PMMLElementRequestProcessor
* LocalModeCalcStatsRequestProcessor
* LocalModeTransformRequestProcessor
* LocalModeTrainRequestProcessor
* LocalModeModelExecRequestProcessor
* LocalModeModelEvalRequestProcessor-->