---
title: Initialization
---

Step 0: Initialization
======================

Initialize ModelSet
-------------------

Run in terminal

    $ shifu new <ModelSetName>

to create a new ModelSet. 

A default ModelConfig will be created inside the ModelSet folder.


Initialize DataSet
------------------

Some restrictions on current DataSet:

* target column could only be integers


### Options

``dataSet`` section:

#### source 

* ``Local``: find data from local file system
* ``HDFS``: find data from HDFS

* * *

#### dataPath

The path of the dataSet. Could be either absolute(search from root) or relative(search from home folder)

* * *

#### dataDelimiter

The delimiter of the dataSet

* * *

#### headerPath

The path of the header. Could be either absolute or relative

* * *

#### headerDelimiter

The delimiter of the header

* * *

#### filterExpressions

Pig expressions to filter the raw data

* * *

#### targetColumnName

A single string, specify the name of the target column. The column will be marked as ``"columnFlag": "Target"`` in ``ColumnConfig``

* * *

#### weightColumnName

A single string, specify the name of the weight column. This column will be used as the significance of a training record

#### posTags

A list of integers as positive tags.

E.g. ``"posTags" : [ "M" ],``

* * *

#### negTags

A list of integers as negative tags

E.g. ``"negTags" : [ "1", "2", "3", "4" ],``

> **Note**: records with tag not listed in eighter ``posTags`` or ``negTags`` will be ignored.

> **Note**: ``targetColumnName`` is the name of the column, while ``posTags`` and ``negTags`` are the values of **that** column.


* * *


#### metaColumnNameFile

The path to a file that contains all the columns names that should be treated as meta columns. E.g.

    "metaColumnNameFile" : "./meta.names",

and inside ``meta.names`` file, each line is a column name:

    $ cat meta.names
    column_name_1
    column_name_2

The columns listed here will be marked as ``"columnFlag": "Meta"`` in ``ColumnConfig``

* * *

#### categoricalColumnNameFile

In the same format of ``metaColumnNameFile``.

* all the columns listed in this file will be marked as categorical: ``"columnType": "C"``; 
* all the columns **NOT** listed in this file and **NOT** ``Meta`` or ``Target`` will be marked as numerical: ``"columnType": "N"`` 



Initialize ColumnConfig
-----------------------

Run in terminal

    $ shifu init

To generate initial ColumnConfig from the ModelConfig ``dataSet`` section and the raw data.

Folder Layout
-------------

After Initialization, the ModelSet folder should contain two config files: ModelConfig and ColumnConfig. 

    <ModelSetName>/
        ├──ModelConfig.json
        └──ColumnConfig.json

Learn more: [Folder Layout](/docs/stable/guide/layout)