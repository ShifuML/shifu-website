---
title: Evaluation
---

Step 6: Evaluation
==================

Input / Output
--------------

* ###Input: 
    * Eval DataSet
    * ColumnConfig
    * ModelConfig - ``eval`` section
* ###Output:
    * Score
    * Performance Matrix

Commands
--------

Run all ``eval``s:

    $ shifu eval

Run ``eval`` by names:
    
    $ shifu eval -run <EvalSetName>


Description
-----------

The schema of the evaluation dataset does not have to exactly the same as the training dataset. Eval can work as long as the evaluation dataset contains all the ``finalSelect`` columns.


There are two sets of results from ``eval`` for now:

* **Score**: each record will receive a score in ``[0,1]``, which is the confidence of the record being positive
* **Performance Matrix**: a matrix of the key measurements is calculated, which can be used to generate the curves

Options
-------

    evals: [ 
        {
            "name": String,
            "dataSet": {
                (options in dataSet)
            }
            "weightColumnName" : String,
            "bucketNum" : Number,
            "metaColumns" : list of String,
            "modelsPath" : String (Optional),
            "scorePath" : String (Optional),
            "confusionMatrixPath" : String (Optional),
            "performancePath" : String (Optional),
        }
    ]

``evals`` is the only section in ModelConfig that is a list instead of an object. Each object in the list contains the following options:

### name

The name of the ``eval``, no white spaces. E.g. the name is "foo", then call eval by 

    $ shifu eval foo

### dataSet

The same as the dataSet section described in [initialization](/docs/init#initialize-dataset)

> If ``dataSet.targetColumnName`` is null, empty string or not available, it will only calculate score but not performance matrix.

* * *

### weightColumnName

The specified column will be used as the weight of the unit when calculating the performance.

* * *

<!--### bucketOption

Choose which to be used to decide the bucket range. E.g. if ``bucketOption`` is set to ``CU`` and ``bucketNum`` is set to 10, then records start to fell into the 1st bucket until the unit CatchRate reaches 10%(1/10), then the second bucket until 

* CU: CatchRate, Unit
* CX: CatchRate, specified column
* HU: HitRate, Unit
* HX: HitRate, specified column
* AU: ActionRate, Unit
* AX: ActionRate, specified column

* * * -->

### bucketNum

Number of the buckets. In binning, ``maxBinNum`` might be different from the result of ``binLength``; however in evaluation we always get exact ``bucketNum`` buckets.

This number may affect the smoothness of the curves, since each row in the performance matrix will be one point on the curves.

* * *

<!--### saveNormalizedData

Evaluation will load raw data and normalize on the fly so by default there is no normalized evaluation dataset stored, set this option to ``true`` to store the normalized data for verification -->


<!--### extraColumnsInScoreFile -->
### metaColumns

The meta information to be stored along with scores. 

If this list is empty, only scores will be stored, it can still calculate the performance matrix, however it will be impossible to link the score to the record.

Good candidates for this list are some id columns for reference, or some key mesurements you are interested in.

***

### modelsPath

This option could point to different models path, if ''modelsPath'' set to be null, the shifu would load all the models under ''<ModelSetName>/models'', but you are able to set some model path, shifu could load those files if the path is a folder or a model file if the path is a filename. 

The modelsPath support * notation after the last "/", it means
    
    /path/to/models/*.nn 

is supported by Shifu.

The modelsPath should be HDFS path if you set dataset's sourceType is HDFS, otherwise, it's local file system path.

***

### scorePath

This option is the path to a score result, if it's null, all the score result after model computing would store into a default location, or set a path explicitly, the shifu would save the score into this specify path.

***

### confusionMatrixPath

This options is about confusion matrix which include sorted socre and their tp/tn/fp/fn, set it null is ok, the option is local file system path

***

### performancePath

This options is the final performance matrix output path, it's local also.

***

Folder Layout
-------------

At the end of evaluation, you should have a complete ModelSet folder.

    <ModelSetName>/
    ├───ModelConfig.json
    ├───ColumnConfig.json
    ├───models/
    │   ├───model0 
    │   ├───model1
    │   ├───model2
    │   └───...
    ├───evals
    │   ├───<EvalName1>/
    │   │   ├───EvalScore/
    │   │   ├───EvalPerformonce.json
    │   │   ├───EvalNormalizedData/
    │   │   └───EvalConfusionMatrix
    │   └───...
    └───tmp/
        ├───PreTrainStats/
        ├───NormalizedData/
        ├───SelectedRawData/
        ├───TrainDataScore/
        └───BinAvgScore/

Learn more: [Folder Layout](/docs/stable/guide/layout)
