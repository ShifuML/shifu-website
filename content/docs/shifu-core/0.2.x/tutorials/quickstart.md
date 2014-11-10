---
title: Quick Start
---

Quick Start
=====

> This is a quick start for the impatient! Hadoop isn't required for this quick start, Shifu will run locally on your machine. All data and settings are included with the Shifu [download](/project/download). To train a model on Hadoop, check out the full-length [Wisconsin Diagnostic Breast Cancer](../wdbc) tutorial.

Preparation
-----

[Download](/project/download/#download) and [install](/project/download/#install) Shifu onto your machine.

Tutorial
----------

First, navigate to the quick start tutorial:

	$ cd $SHIFU_HOME/example/wdbc/wdbcModelSetLocal

### Initialize Shifu

Initialize Shifu using the pre-cooked model configuration in ``ModelConfig.json``.  

    $ shifu init

Initialization verifies that Shifu can find the model training set in ``$SHIFU_HOME/example/wdbc/wdbcDataSet/``

    $SHIFU_HOME/
    └───example/
        └───wdbc/
             └───wdbcDataSet/
                 ├───wdbc.data
                 ├───wdbc.train
                 ├───wdbc.eval
                 └───wdbc.header               

Notice that ``ColumnConfig.json`` is created.  Open `ColumnConfig.json`, and you'll see that ``columnNum``, ``columnName``, ``columnType``, ``columnFlag`` reflect the training set.

### Calculate stats and distributions

Calculate statistics on the variables in the data set, so Shifu can determine the most predictive variables.  

    $ shifu stats
    
Open ``ColumnConfig.json``, and the variables with ``columnType`` set to ``N``(numerical) or ``C``(categorical) should be populated with ``columnStats`` and ``columnBinning``.

### Variable Selection

Select the variables to be used to train the model. In this case, Shifu auto-selects the 30 most predictive variables.  
    
    $ shifu varselect

Open ``ColumnConfig.json``, and notice that the selected columns to be used in the model will be marked as ``finalSelect: true``

### Normalization

Normalize the selected variables. Shifu stores the normalized data set in ``tmp/NormalizedData``.

    $ shifu normalize

### Training

You are now ready to train a model, let's get started.

    $ shifu train


Congratulations - you've just trained your first model using Shifu!  

After the training is complete, you can find your trained models in the ``models`` folder

### Evaluation

After you've trained your model, evaluate your model's performance on an evaluation data set.

    $ shifu eval 

Shifu will calculate score, confusion matrix and performance curves against the evaluation dataset.

Next steps
-----

Now that you've trained your first model using Shifu, you are ready to train a model 

- on a [Hadoop cluster](/docs/shifu-core/0.2.x/tutorials/wdbc/) 
- using different [variable selection](/docs/shifu-core/0.2.x/guide/varselect/) methods
- using [your own data on HDFS](/docs/shifu-core/0.2.x/guide/init/#initialize-dataset)
- with [multiple training bags](/docs/shifu-core/0.2.x/guide/train/#options)