---
title: Wisconsin Diagnostic Breast Cancer Tutorial
---

Wisconsin Diagnostic Breast Cancer Tutorial
============================================

This tutorial trains a model on the [Wisconsin Diagnostic Breast Cancer](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)) data set.  The models tries to predict a diagnosis of **Benign** or **Malignant**.

Features are computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.

Prerequisites
-------------

[Download](/project/download/#download) and [install](/project/download/#install) Shifu onto your machine with direct Hadoop and HDFS access.  For this tutorial, we'll refer to this machine as you Hadoop CLI machine, ``hadoopcli``.

In order to run Shifu on Hadoop, ensure that your Hadoop CLI machine has [Pig](http://pig.apache.org/) installed.

	hadoopcli:~$ which pig
	/usr/local/bin/pig

In order to train a model on Hadoop, ensure that your Hadoop cluster has a running [ZooKeeper](http://zookeeper.apache.org/) installation. 

For this tutoral, let's assume the ZooKeeper hosts are ``zookeeper1, zookeeper2, zookeeper3``.  Shifu needs to be configured to use those ZooKeeper hosts by modifying  ``$SHIFU_HOME/conf/shifuconfig`` like so:

	# zookeeperServers is used for distributed training 
	zookeeperServers=zookeeper1,zookeeper2,zookeeper3

Prepare the training data
---------------

Create a new folder ``wdbcDataSet`` to store the training data:

    hadoopcli:~$ mkdir wdbcDataSet
    hadoopcli:~$ cd wdbcDataSet

Download the data:

    hadoopcli:wdbcDataSet$ wget http://mlr.cs.umass.edu/ml/machine-learning-databases/breast-cancer-wisconsin/wdbc.data

Split the data into 2 parts: training and evaluation:

    hadoopcli:wdbcDataSet$ awk '{s=rand(); if(s>0.2){print > "wdbc.train"}else{print > "wdbc.eval"}}' wdbc.data

Create a new file called ``wdbc.header`` with the following data:

	id|diagnosis|mean_radius|mean_texture|mean_perimeter|mean_area|mean_smoothness|mean_compactness|mean_concavity|mean_concave_points|mean_symmetry|mean_fractal_dimension|std_radius|std_texture|std_perimeter|std_area|std_smoothness|std_compactness|std_concavity|std_concave_points|std_symmetry|std_fractal_dimension|worst_radius|worst_texture|worst_perimeter|worst_area|worst_smoothness|worst_compactness|worst_concavity|worst_concave_points|worst_symmetry|worst_fractal_dimension
        
The final folder layout of ``wdbcDataSet`` should be:

    wdbcDataSet/
	├───wdbc.data
    ├───wdbc.train
    ├───wdbc.eval
    └───wdbc.header

Put ``wdbcDataSet`` onto HDFS:

	hadoopcli:wdbcDataSet$ cd ..
	hadoopcli:~/$ hadoop fs -put wdbcDataSet wdbcDataSet
	
Create Initial ModelConfig
--------------------------

Now that the training set is created and put on to HDFS, create a new Shifu ModelSet:

    hadoopcli:~/$ shifu new wdbcModel
    hadoopcli:~/$ cd wdbcModel

Choose the RunMode
-----------

Shifu can run either locally on the Hadoop CLI machine or on Hadoop.  By default, Shifu will run locally.  To configure Shifu to run on Hadoop, open ``ModelConfig.json`` and make the following change:

	"runMode" : "mapred",


Create Initial ColumnConfig
---------------------------

Now it's time to configure Shifu to use the WDBC data set on HDFS.

First, we need to let Shifu know to not use the column ``id`` as a variable.   Open ``meta.column.names`` and add the follow line:

    id

Next, open ``ModelConfig.json`` and make the following changes to the ``dataSet`` section to configure Shifu to use the WDBC data set on HDFS: 

	"dataSet" : {
		"source" : "HDFS",
		"dataPath" : "/wdbcDataSet/wdbc.train",
		"dataDelimiter" : ",",
		"headerPath" : "/wdbcDataSet/wdbc.header",
		"headerDelimiter" : "|",
		"filterExpressions" : "",
		"weightColumnName" : "",
		"targetColumnName" : "diagnosis",
		"posTags" : [ "M" ],
		"negTags" : [ "B" ],
		"metaColumnNameFile" : "meta.column.names",
		"categoricalColumnNameFile" : "categorical.column.names"
  	},

Verify everything is set up correctly by running

    hadoopcli:wdbcModel$ shifu init

If successful, you should find ``ColumnConfig.json`` in your ``wdbcModel`` folder. Verify the content:

* the first column should be ``id`` column and its flag is ``Meta``
* the second column should be ``diagnosis`` and its flag is ``Target``
* all the rest columns should have ``columnType`` as ``N``, numerical
* all the columns should have ``finalSelect`` as ``false`` since this is just initialized
* all the columns should have ``null`` in ``columnStats`` and ``columnBinning``

Calculate Statistics
--------------------

Now we know the basics about the data set but nothing more than the names and their roles. By calculating the statistics of the columns, we can tell which columns are more valuable while which ones can be safely ignored without losing any information. The more data we have the more acurate the stats are, so only turn down the sampleRate if you hit the memory limit. Set the number of bins to a reasonable number and leave the ``binningMethod`` as ``EB`` for now so each bin will have equal number of positive records.

    "stats" : {
        "maxNumBin" : 10,
        "binningMethod" : "EqualPositive",
        "sampleRate" : 1.0,
        "sampleNegOnly" : false
    },

Calculate stats:

    $ shifu stats

Open the ``ColumnConfig`` file, verify that all the columns except for ``Meta`` columns and ``Target`` column should have ``columnStats`` and ``columnBinning`` calculated. 

Learn more from [ColumnConfig](../../guide/columnconfig) and [Pre-Train Stats](../../guide/stats) page.

Variable Selection
------------------

There are 3 methods for variable selection, in this tutorial we only use ``Filter``, set ``Force`` and ``Wrapper`` to false; since we only have 30 column, you can set the ``filterNum`` to any number larger than 30 to use all of them, or a smaller number to actually do the variable selection, here we set it to 20; filtering by ``KS`` or ``IV`` should generate similar results. Here is a sample settings:

    "varSelect" : {
        "forceEnable" : false,
        ...
        "filterEnable" : true,
        "filterNum" : 20,
        "filterBy" : "KS",
        ...
    },

Now kick off the job, this should be very fast since it only read ColumnConfig and edit ``finalSelect`` field and save it back. 

    $ shifu varselect

You should see a list of selected variables. Check ColumnConfig to see if the ``finalSelect`` fields are correctly set.

Learn more from [Variable Selection](../../guide/varselect) page.

Normalization
-------------

This is a small dataset so you might want to use all the data, so keep the sampleRate to 1.0. All the rest options can be safely keep as default.

    "normalize" : {
        "stdDevCutOff" : 4.0,
        "sampleRate" : 1.0,
        "sampleNegOnly" : false
    },
 
Start normalization:

    $ shifu normalize

The normalized data will be saved under ``tmp/NormalizedData``

Learn more from [Normalization](../../guide/normalize) page.

Train
-----

Use the default settings to train a neural network

    $ shifu train

Check the ``train`` page for details.

Learn more from [Train](../../guide/train) page.

Evaluation
----------

``dataSet`` has the same options as the one specifying the training data. The only difference is the dataPath: point it to ``wdbc.eval`` instead of ``wdbc.train``.

``dataSet#weightColumnName`` is used to set the weight for each record when calculating performance matrix. If this is null, all the records will receive weight of 1.0, so the result for ``Weighted`` will be the same as ``Unit``.

Run the evaluation

    $ shifu eval


