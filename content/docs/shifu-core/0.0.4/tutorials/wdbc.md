---
title: Wisconsin Diagnostic Breast Cancer Tutorial
---

Wisconsin Diagnostic Breast Cancer Tutorial
============================================

Install Shifu
-------------

If you haven't installed Shifu, please find the instructions on the [Install](/install) page 

Prepare DataSet
---------------

In this tutorial we are using the data titled Wisconsin Diagnostic Breast Cancer (WDBC)

Read about the dataset

    http://mlr.cs.umass.edu/ml/machine-learning-databases/breast-cancer-wisconsin/wdbc.names

Create a new folder ``wdbc`` to store our data and models. Inside it, create ``wdbcDataSet`` folder:

    $ mkdir wdbcDataSet
    $ cd wdbcDataSet

Download data:

    $ wget http://mlr.cs.umass.edu/ml/machine-learning-databases/breast-cancer-wisconsin/wdbc.data

Split data into 2 parts: train and eval(modify ``s`` if desired):

    $ awk '{s=rand(); if(s>0.8){print > "wdbc.train"}else{print > "wdbc.eval"}}' wdbc.data

Manually create a header file from ``wdbc.names`` section 7, save as ``wdbc.header``:
    
    id|diagnosis|mean_radius|mean_texture|mean_perimeter|mean_area|mean_smoothness|mean_compactness|mean_concavity|mean_concave_points|mean_symmetry|mean_fractal_dimension|std_radius|std_texture|std_perimeter|std_area|std_smoothness|std_compactness|std_concavity|std_concave_points|std_symmetry|std_fractal_dimension|worst_radius|worst_texture|worst_perimeter|worst_area|worst_smoothness|worst_compactness|worst_concavity|worst_concave_points|worst_symmetry|worst_fractal_dimension

The folder layout should be:

    wdbc
    └───wdbcDataSet/
        ├───wdbc.data
        ├───wdbc.train
        ├───wdbc.eval
        └───wdbc.header

Optional: put the wdbc folder onto HDFS if you would like to try it on cluster.

Create Initial ModelConfig
--------------------------

Move out of the wdbcDataSet folder so we do not pollute it

    $ cd ..

Create a new ModelSet:

    $ shifu new wdbcModelSet
    $ cd wdbcModelSet

A ModelConfig file has been created inside the wdbcModelSet folder.

    wdbc
    ├───wdbcDataSet/
    │   ├───wdbc.data
    │   ├───wdbc.train
    │   ├───wdbc.eval
    │   └───wdbc.header
    └───wdbcModelSet/
        └───ModelConfig.json

Choose Mode
-----------

You can choose either ``pig`` or ``akka`` for executing the jobs.

* ``pig``: a set of MapReduce jobs will be generated and it is either run on a Hadoop cluster or on a single machine by pig's ``local`` mode. However currently the training step is an exception, it will always run on local machine.
* ``akka``: an alternative way for distributed computing, with no dependencies on Hadoop. 

Create Initial ColumnConfig
---------------------------

Create a ``meta.names`` and put ``id`` in it, so ``id`` column is not treated as variable:

    # meta.names
    id

Edit ModelConfig file ``dataSet`` section.

Keep the source as ``LOCAL`` or change to ``HDFS`` if data is on hdfs

    "source" : "LOCAL",

Change ``dataPath`` and ``dataDelimiter``

    "dataPath" : "/path/to/wdbc.train",
    "dataDelimiter" : ",",

> **Note**
> 
>   Currently the ``path`` does not support ``~``, use absolute path instead.

Change ``headerPath`` and ``headerDelimiter``

    "headerPath" : "/path/to/wdbc.header",
    "headerDelimiter" : "|",

Keep ``filterExpressions`` as null to use all the data
    
    "filterExpressions" : null,

Change ``targetColumnName`` to ``diagnosis``

    "targetColunmName" : "diagnosis",

There are two classes in ``diagnosis``, let's use ``M`` as positive tag and ``B`` as negative tag.

    "posTags" : [ "M" ],
    "negTags" : [ "B" ],

Tell ``Shifu`` which columns are meta

    "metaColumnConf" : "meta.names",

And in our case there is no categorical data, so keep this as ``null``

    "categoricalColumnConf" : null

In ``runConf`` section, set ``runMode`` to ``akka`` to use your local box without hadoop, otherwise set it to ``pig``. 

    "runConf" : {
        "runMode" : "akka",
        "pigParallelNum" : 20,
        "akkaParallelNum" : 16
    },

Done. Now create initial ColumnConfig by running:

    $ shifu init

You should find a ``ColumnConfig.json`` in your ModelSet folder. Verify the content:

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
        "binningMethod" : "EB",
        "sampleRate" : 1.0,
        "sampleNegOnly" : false
    },

Calculate stats:

    $ shifu stats

Open the ``ColumnConfig`` file, verify that all the columns except for ``Meta`` columns and ``Target`` column should have ``columnStats`` and ``columnBinning`` calculated. 

Learn more from [ColumnConfig](/docs/columnconfig) and [Pre-Train Stats](/docs/stats) page.

Variable Selection
------------------

There are 3 methods for variable selection, in this tutorial we only use ``Filter``, set ``Force`` and ``Wrapper`` to false; since we only have 30 column, you can set the ``filterNum`` to any number larger than 30 to use all of them, or a smaller number to actually do the variable selection, here we set it to 20; filtering by ``KS`` or ``IV`` should generate similar results. Here is a sample settings:

    "varSelect" : {
        "forceEnable" : false,
        ...
        "filterEnable" : true,
        "filterNum" : 20,
        "filterBy" : "KS",
        "wrapperEnabled" : false,
        ...
    },

Now kick off the job, this should be very fast since it only read ColumnConfig and edit ``finalSelect`` field and save it back. 

    $ shifu varselect

You should see a list of selected variables. Check ColumnConfig to see if the ``finalSelect`` fields are correctly set.

Learn more from [Variable Selection](/docs/varselect) page.

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

Learn more from [Normalization](/docs/normalize) page.

Train
-----

Use the default settings to train a neural network

    $ shifu train

Check the ``train`` page for details.

Learn more from [Train](/docs/train) page.

Evaluation
----------

``dataSet`` has the same options as the one specifying the training data. The only difference is the dataPath: point it to ``wdbc.eval`` instead of ``wdbc.train``.

``metricColumnName`` is used to set the weight for each record when calculating performance matrix. If this is null, all the records will receive weight of 1.0, so the result for ``Weighted`` will be the same as ``Unit``.

Run the evaluation

    $ shifu eval

The performance matrix will be printed out in terminal, to visualize the result, visit [http://10.9.187.2:8080/performance](http://10.9.187.2:8080/performance) and upload the ``EvalPerf.json`` file.
