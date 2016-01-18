---
title: Release Notes
---

Release Notes
=========

Version 0.2.7
-------------

* Sampling Function Improvement
	* https://github.com/ShifuML/shifu/issues/93
	* https://github.com/ShifuML/shifu/issues/140
* Binning Improvement
	* https://github.com/ShifuML/shifu/issues/148
	* https://github.com/ShifuML/shifu/issues/157
* Stats Step Improvement
	* https://github.com/ShifuML/shifu/issues/155
	* https://github.com/ShifuML/shifu/issues/137
	* https://github.com/ShifuML/shifu/issues/75
* Norm Step Improvement
	* https://github.com/ShifuML/shifu/issues/103
	* https://github.com/ShifuML/shifu/issues/120
	* https://github.com/ShifuML/shifu/issues/131
	* https://github.com/ShifuML/shifu/issues/142
* Train Step Improvement
	* https://github.com/ShifuML/shifu/issues/66
	* https://github.com/ShifuML/shifu/issues/159
	* https://github.com/ShifuML/shifu/issues/166
	* https://github.com/ShifuML/shifu/issues/106
* Variable Selection Step Improvement
	* https://github.com/ShifuML/shifu/issues/57
	* https://github.com/ShifuML/shifu/issues/102
* Distributed LR Algorithm Improvement (Experimental)
	* https://github.com/ShifuML/shifu/issues/56
* Multiple classes NN Algorithm Improvement (Experimental)
	* https://github.com/ShifuML/shifu/issues/149
* Pig on Tez Support

Version 0.2.6
-------------

* https://github.com/ShifuML/shifu/issues/133: Add skewness and kurtosis stats
* https://github.com/ShifuML/shifu/issues/134: Add CSV ColumnConfig Format for ColumnConfig.json
* https://github.com/ShifuML/shifu/issues/117: Add AUC Computation on Eval Step
* https://github.com/ShifuML/shifu/issues/118: Add Shortcut Commands: 'norm', 'varsel'
* https://github.com/ShifuML/shifu/issues/127: Support HDP 2.6.0.2.2.4.2-2
* https://github.com/ShifuML/shifu/issues/83: Add Distinct Count Statistics
* https://github.com/ShifuML/shifu/issues/82: Auto-detect Variable Type

Version 0.2.5
-------------

* https://github.com/ShifuML/shifu/issues/97: Upgrade Guagua to latest version 0.7.0.
	* New features included in Guagua 0.6.0 to continuous improve performance of Shifu:
		* 'out-of-core' list to support worker to scale out from memory to disk.
		* Netty-based coordinators to decrease dependency on zookeeper and improve iteration communication performance.
		* Embedded zookeeper server supported not only in client as a thread, but also in master node as a process.
	* One improtant feature included in Guagua 0.7.0 to accelerate training in Shifu:
		* Partial-compete feature means in each iteration master only wait for partial workers complete and to 
		   ignore straggler worker result. 
* https://github.com/ShifuML/shifu/issues/105: SPDT stats performance improvement.
	* 'binningAlgorithm=SPDTI' (default value) in ModelConfig.json#stats is to improve scalability for big data. 
		This solution is based on SPDT binning algorithm and called SPDT-Improvement(SPDTI).
	* Using SPDTI, with 20 million of records and 1600 variables, 20 minutes to finish stats. With 100 million of 
		records and 1600 variables, 30 minutes to finish stats.
* https://github.com/ShifuML/shifu/issues/59: Shifu eval confusion and performance improvement.
	* With 20 million of records and 1600 variables, 13 minutes to finish eval step compared with 20 minutes in 
		Shifu 0.2.4.
* https://github.com/ShifuML/shifu/issues/64: Set the Hadoop parallel number automatically.
	* With input data set increase, user no need to set 'hadoopParallelNumber' in shifuconfig.
	* This value is tuned automatically new Shifu.
* Binning improvement
	* https://github.com/ShifuML/shifu/issues/77: Add missing value count as a bin.
	* https://github.com/ShifuML/shifu/issues/79: Add weights to binning.
	* https://github.com/ShifuML/shifu/issues/80: Weights binning KS/IV/WoE computing.
* https://github.com/ShifuML/shifu/issues/72: Support WoE transformation when doing normalization
* Training step improvement
	* https://github.com/ShifuML/shifu/issues/95: NN doesn't support 0 hidden layer.
	* https://github.com/ShifuML/shifu/issues/76: Add convergence parameter to Shifu d-train.
	* https://github.com/ShifuML/shifu/issues/84: Add local disk support to scale in-memory data set.
	* https://github.com/ShifuML/shifu/issues/60: Continuous model training.
	* https://github.com/ShifuML/shifu/issues/85: Add 'epochsPerIteration' parameter in NNWorker.
* Bug fix:
	* https://github.com/ShifuML/shifu/issues/98
	* https://github.com/ShifuML/shifu/issues/92
	* https://github.com/ShifuML/shifu/issues/70
	* https://github.com/ShifuML/shifu/issues/69
	* https://github.com/ShifuML/shifu/issues/67

Version 0.2.4
-------------

* https://github.com/ShifuML/shifu/issues/20: Work flow change.
	* Old: new -> init -> stats -> varselect -> normalize -> train -> eval
    * New: new -> init -> stats -> normalize -> varselect -> train -> eval
    * If do variable selection again after a model, current work flow no need do normalize step, after variable selection then do training step.
* https://github.com/ShifuML/shifu/issues/49: Add distributed sensitivity analysis variable selection.
    * 'varSelect.wrapperEnabled=true' and 'wrapperBy=SE' in ModelConfig.json#varSelect part to enable sensitivity variable selection.
    * 'wrapperRatio' in ModelConfig.json#varSelect part is a percent to set how many variables will be removed.
    * To continue variable selection by sensitivity method, run 'shifu varselect' again. 
    * With 20 million of records and 1600 variables, 70 minutes (45 minutes for 200 epoch training and 25 minutes for sensitivity variable selection).
* https://github.com/ShifuML/shifu/issues/38: Improve scalability in stats step.
    * 'binningAlgorithm=SPDT' (default value) in ModelConfig.json#stats is to do variable statistics to improve scalability for big data.
        * Using SPDT, with 20 million of records and 1600 variables, 50 minutes to finish variable selection.
    *'binningAlgorithm=MunroPat' in ModelConfig.json#stats is another approach to do variable statistics to improve scalability for big data.
* https://github.com/ShifuML/shifu/issues/58: Improve scalability in eval step for HDFS mode.
    * With 20 million of records and 1600 variables, 20 minutes to finish eval step with only 1GB driver memory.
* https://github.com/ShifuML/shifu/issues/61: Embeded zookeeper server support.
    * No need to set zookeeper servers so far since embeded zookeeper server will help on training models.
    * Big data training, independent zookeeper cluster is strongly recommended.
    * Upgrade Guagua to 0.5.0 to get support from Guagua for this feature.
* Add PMML standard model converter.
    * To convert .nn files into pmml, run "shifu export -t pmml" or just "shifu export" (The pmml is default)
        * All generated pmml files will be under <Model-Directory>/pmmls/
* Bug fix:
    * https://github.com/ShifuML/shifu/issues/45
    * https://github.com/ShifuML/shifu/issues/51
    * https://github.com/ShifuML/shifu/issues/39
    * https://github.com/ShifuML/shifu/issues/40
    * https://github.com/ShifuML/shifu/issues/45

Version 0.2.3
-------------

* Remove the duplicate sample code in Normalize.pig
* Print out the model file path if fail to load it
* Change default normalization samplerate as 1.0
* BugFix: filterExpressions doesn't work if the field is null
* Add throwable check when pig script fails

Version 0.2.2
-------------
 
* Fix bug when running multi-evaluation in HDFS, now all results are stored;
* Fix the schema for evaluation score;
* Enable different evaluation set to have its own target column/posTags/negTags;
* Add -list/-delete for `shifu eval`
* Change the type of evaluation score to double
* Add distributed bagging hadoop jobs running in parallel support
* Change trainer id start from 1 for both local and mapred mode.
* Reduce confusion matrix memory use by storing each confusion matrix instantly after calculation
* Add release profile with GPG in pom 
* Add javadoc plugin in pom
* Add source plugin version in pom

Version 0.2.1
-------------

* BugFix: inconsistent binBoundary and binLength in EqualTotal binning
* BugFix: incorrect initial value of binAvgScore in EqualTotal binning

Version 0.2.0
-------------

* Make Shifu to support Hadoop-2.0 (add -Phdp-yarn when building)
* Show mapper progress in JobTracker and show progress in CLI when using distribute training 
* Validation rate = 0% is permit. In that case, save when train error goes down
* Generate better default ModelConfig, and create empty files for some configuration
* Refactor integration API - add static Normalizer.normalize(), simplify constructor of ModelRunner, and allow load models by path
* [Test] add support for decision-tree
* Enhance shifu script to make it support Hadoop1 and Hadoop2 smoothly
* Add new info for ColumnConfig: missing, total, missingPercentage, binWeightedPos and binWeightedNeg
* Update the layout of EvalPerformance.json
* Add version number in ModelConfig, ColumnConfig and EvalPerformance

Version 0.1.1
-------------

* Use gradient aggregation to improve distributed training model performance
* Fix the bug when sorting the model results
    * Sorting the model results correctly
	* The sourceMetaColumnFile couldn't be read when using mapred + HDFS to run evaluation 
* Hidden custom path in ModelConfig, since most users won't change them
* Add meta column names in file header, when using `mapred` to run evaluation
    
Version 0.1.0
-------------

* ModelConfig Schema Changes
    * dataSet
        * typo: targetColunmName -> targetColumnName
        * metaColumnConf -> metaColumnNameFile
        * categoricalColumnConf -> categoricalColumnNameFile
        * add weightColumnName
    * runConf
        * runMode move to ``basic`` section
    * stats
        * binningMethod: EB -> EqualPositive
    * varSelect
        * remove wrapper options
    * normalize
        * remove ``weightAmplifier``(moved to ``dataSet`` section)
    * eval
        * weightedColumn -> dataSet.weightColumnName
        * scoreColumn -> performanceScoreSelector
        * bucketNum -> performanceBucketNum
        * metaColumns -> scoreMetaColumnNameFile
        * move paths to ``customPaths``
    
Version 0.0.4
-------------

* Add distributed nn implementation based on hadoop mapreduce job.
    1. To trigger distributed nn, set ``runMode`` to ``pig``;
    2. For distributed nn, please provide your own ``zkServers`` of ``train`` group.
    3. You can set ``epochsPerIteration`` which means in each iteration how many iterations will be executed.
* Eval refactor.
    1. Add ``-score``, ``-confmat``, ``-perf`` options for eval command
    2. Add ``scoreColumn`` option in ModelConfig.json to get the target score
    3. Add ``modelsPath`` ``scorePath`` ``confusionMatrixPath`` ``performancePath`` options in ModelConfig.json
    4. Change "metricColumnName" to "weightedColumn"
* Fix the bug: the delimiter of evaluation data doesn't take effect in AKKA mode
* Fix the bug: Meta validation fails to report error when - ``"NumHiddenNodes" : [ "a", 45 ]``
* Write in-place QuickSort to replace Collections.sort() for memory consumption

