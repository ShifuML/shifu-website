---
title: Release Notes
---

Release Notes
=========

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

