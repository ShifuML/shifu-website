---
title: ColumnConfig
---

ColumnConfig
============

ColumnConfig stores all the meta data of the columns. It will be created and updated automatically by Shifu, through each step. 

> A common questions is, if it is not meant to be modified by users, why is it called **Config**. Well... it is designed to do everything automatically and magically(calculate stats, variable selection, etc), however nothing stops you from editing the config file manually, or write your own tool to manipulate it; at the end of the day, it is just a plain JSON file that tells the framework how to prepare the data for training. Checkout the **"Input/Output"** section below to understand where are the fields updated and where are they used.

Schema
------

    {
        "columnNum": Number,
        "columnName": String,
        "version": String(release version),
        "columnFlag": "ForceSelect|ForceRemove|Target|Meta|''",
        "columnType": "N|C",
        "finalSelect": Boolean,
        "columnStats": {
            "max": Number,
            "min": Number,
            "mean": Number,
            "stdDev": Number,
            "ks": Number,
            "iv": Number
        }, 
        "columnBinning": {
            "binLength": Number",
            "binBoundary": List of Number,
            "binCategory": List of String,
            "binCountNeg": List of Number,
            "binCountPos": List of Number,
            "binPosRate": List of Number,
            "binAvgScore": List of Number
        }
    }

Fields
------

#### columnNum

An integer denoting the number of the column, starting from 0.

#### columnName

The name of the column. Since the column number may not be consistent for the same variable appearing in different data sets(e.g. the tag column may be the first column in one data set but the third in another), we use columnName to match the variables, make sure the names are consistent across data sets.

#### columnFlag

There should be one and only one flag for each column. Currently the following flags are supported:

* ``ForceSelect``: the column will always be selected for training, whatever the variable selection method is used.
* ``ForceRemove``: the column will always be excluded for training, whatever the variable selection method is used.
* ``Target``: the column is the target column, it will not be affected by variable selection and nomalization. There should be one and only one target column in the data set (TODO: sanity check by the tool)
* ``Meta``: the column will be ignored.
* ``""``(empty string): the column is a non-target column, a candidate variable. It will be used in training only if it goes through the  variable selection methods the use chooses.

#### columnType

columnType describes the nature of the column. Three column types are supported.

* ``N``: numerical, the data will be stored as Double internally. e.g. USD
* ``C``: categorical, the data will be stored as String. E.g. CountryCode(US, CN)

#### finalSelect

Originally all columns are set to false. After variable selection, the selected columns will have ``finalSelect`` set to true; Only the columns with ``finalSelect`` set as true will be normalized finally fed to the training algorithm.

#### columnStats

Statistics of the column.

* ``max``: maximum value
* ``min``: minimum value
* ``mean``: mean value, will be used in normalization
* ``stdDev``: standard deviation, will be used in normalization
* ``ks``: ks value, will be used in variable selection
* ``iv``: information value, will be used in variable selection

#### columnBinning

The result of binning

* ``binLength``: number of bins. If the column is Categorical, this is the number of categories.
* ``binBoundary``: not null if the column is Numerical. The list of numbers denotes the left boundary of each bin, inclusive. E.g. ``binBoundary: [-Infinity, 1.0, 20.0]`` describes a column with 3 bins, where the first bin range from ``(-Infinity, 1.0)``, the second bin ``[1.0, 20.0)``, and the last one ``[20.0, +Infinity)``
* ``binCategory``: not null if the column is Categorical. 
* ``binCountNeg``: the count of negative records for each bin
* ``binCountPos``: the count of positive records for each bin
* ``binPosRate``: ``CountPos / (CountNeg + CountPos)`` for each bin
* ``binAvgScore``: once the model is trained and post-train stats is called, this will be updated to the average score for each bin.

Input/Output
------------

In certain steps Shifu will update ``ColumnConfig`` with calculated meta info of the columns; in some steps Shifu need to load them back. Here are the details

### Step 0: init

#### As Input

None

#### As Output

* create ``ColumnConfig.json`` file
* update ``columnNum``, ``columnName``, ``columnType``, ``columnFlag``

### Step 1: stats

#### As Input

* read ``columnType``, ``columnFlag``

#### As Output

* if ``columnFlag`` is not ``Target`` or ``Meta``: update ``columnStats`` and ``columnBinning``(except for ``columnBinning.binAvgScore``)

### Step 2: varselect

#### As Input

* if ``filterEnabled``: read ``columnStats.ks``, ``columnStats.iv`` as sorting criteria
* if ``forceEnabled``: check if ``columnFlag`` is ``ForceSelect`` or ``ForceRemove``

#### As Output

* update selected columns' ``finalSelect`` to ``true``

### Step 3: normalize

#### As Input

* ``columnStats.mean``, ``columnStats.stdDev``: to calculate z-Score. 

#### As Output

None

### Step 4: train

#### As Input

None

#### As Output

None

### Step 5: post-train

#### As Input

None

#### As Output

* update ``columnBinning.binAvgScore``

### Step 6: eval


#### As Input

* ``columnStats.mean``, ``columnStats.stdDev``: to calculate z-Score. (to normalize the evaluation dataset the same way as training dataset)

#### As Output

None


