---
title: ModelConfig
---

ModelConfig
===========

``ModelConfig`` contains the basic info about the modelset, and all the options for each step of model training. Contrary to [ColumnConfig](../columnconfig), ``ModelConfig`` should be edited by user; it will not be modified by Shifu.

Schema
------

``ModelConfig`` is a JSON file, though other formats may be supported in the future.

    {
        "basic" : {
            "name" : String,
            "author" : String,
            "description" : String,
        },
        "runConf" : {
            "runMode" : "akka|pig",
            "pigParallelNum" : Number,
            "akkaParallelNum" : Number,
            "pigQueue" : String
        },
        "dataSet" : {
            "source" : "LOCAL|HDFS",
            "dataPath" : String
            "dataDelimiter" : String,
            "headerPath" : String
            "headerDelimiter" : String,
            "filterExpressions" : String,
            "targetColunmName" : String,
            "posTags" : List of String,
            "negTags" : List of String,
            "metaColumnConf" : String,
            "categoricalColumnConf" : String
        },
        "stats" : {
            "maxNumBin" : Number,
            "binningMethod" : "EB|ET|EI",
            "sampleRate" : Number,
            "sampleNegOnly" : Boolean
        },
        "varSelect" : {
            "forceEnable" : Boolean,
            "forceSelectColumnConf" : String,
            "forceRemoveColumnConf" : String,
            "filterEnable" : Boolean,
            "filterNum" : Number,
            "filterBy" : "KS|IV"
        },
        "normalize" : {
            "stdDevCutOff" : Number,
            "sampleRate" : Number,
            "sampleNegOnly" : Boolean,
            "weightAmplifier" : String
        },
         "train" : {
            "baggingNum" : Number,
            "baggingWithReplacement" : Boolean,
            "baggingSampleRate" : Number,
            "validSetRate" : Number,
            "trainOnDisk" : Boolean,
            "numTrainEpochs" : Number,
            "algorithm" : "NN",
            "params" : {
                "NumHiddenLayers" : Number,
                "ActivationFunc" : List of "Sigmoid"],
                "NumHiddenNodes" : List of Number,
                "LearningRate" : 0.1,
                "Propagation" : "Q|S|B|M|R"
            }
        },
        "evals" : [ {
            "name" : String,
            "dataSet" : {
                "source" : "LOCAL|HDFS",
                "dataPath" : String,
                "dataDelimiter" : String,
                "headerPath" : String,
                "headerDelimiter" : String,
                "filterExpressions" : String
            },
            "weightedColumn" : String,
            "bucketNum" : 10
        } ]
    }

Fields
------

### basic section

The basic info about the ModelSet. 

The ``name`` is required as the identifier of the ModelSet and will be used to create HDFS mirror folder is Hadoop cluster is used. By default it is (on HDFS) 

    $HOME/ModelSets/$name

### runConf section

#### runMode

* pig: use hadoop cluster for the available steps: stats, normalize, train, eval
* akka: use local machine

#### pigParallelNum

Will be set as ``default_parallel`` in pig script

#### akkaParallelNum

Depends on the number of available cores of the local machine CPU.

#### pigQueue

Will be set as ``mapred.job.queue.name`` in pig script
    
### dataSet Section

This section will be used in **initialization** step when executing

    $ shifu init

it specifies the location of the training dataset and the options to parse, label, and filter the dataset. An initial ``ColumnConfig`` will be generated base on this section.

Learn more from [Step 0: Initialization](../init).

### stats Section

This section will be used in **calculating statistics** when executing

    $ shifu stats

Learn more from [Step 1: Calculate Statistics](../stats).

### varSelect Section

This section will be used in **variable selection** when executing

    $ shifu varselect

Learn more from [Step 2: Variable Selection](../varselect)

### normalize Section

This section will be used in **data normalization** when executing

    $ shifu normalize

Learn more from [Step 3: Normalization](../normalize)

### train Section

This section will be used in **model training** when executing

    $ shifu train

Learn more from [Step 4: Train](../train)

### eval Section

This section will be used in **model evaluation** when executing

    $ shifu eval

Learn more from [Step 6: Evaluation](../eval)
