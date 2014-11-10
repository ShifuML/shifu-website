---
title: Variable Selection
---

Step 2: Variable Selection
===========================

Command
--------

    $ shifu varselect

Input / Output
--------------

###Input: 

* ``ColumnConfig``
    * Force: ``columnFlag``
    * Filter: ``columnStats.ks``, ``columnStats.iv`` 

###Output:

* Updated ``ColumnConfig`` 
    * selected columns marked as ``"finalSelect": true``

Description
-----------

Originally all the variables are not selected(``"finalSelect": false`` for all columns). Currently 2 methods are provided to flip that switch: Force, Filter

### Force

This is used to manually select or exclude variables for model training. 

This should be used if you have pre-selected the columns; or if there are some newly generated variables that should be included anyway for experiments, and some to be excluded.

### Filter

Automatically select variables based on their pre-calculated "importance", which could be ``KS`` or ``IV``. Check the ``Options`` section for more info.


Options
-------

#### forceEnabled

If true, ``ForceRemove`` and ``ForceSelect`` will be in effect

#### forceSelectColumnNameFile

A single string of the file name that contains all the column names, one name per line.

    "forceSelectColumnNameFile": "./forceSelect.txt",

Inside the file:

    $ cat ./forceSelect.txt
    column_name_1
    column_name_2
    column_name_3

#### forceRemoveColumnNameFile

In the same format as forceSelectColumnNameFile, however the listed columns will be excluded instead.

#### filterEnabled

If set to ``true``, ``KS`` or ``IV`` will be used to sort the list of columns, the top columns will be selected.

#### filterBy

* ``KS``: Kolmogorov Smirnov Test, learn more from [here](http://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test)
* ``IV``: Information Value

#### filterNum

The number of top columns to be selected.

Folder Layout
-------------

At the end of this step, the ModelSet folder should be the same as the previous step however the ColumnConfig is updated.

    <ModelSetName>/
    ├───ModelConfig.json
    ├───ColumnConfig.json
    └───tmp/
        └───PreTrainStats/

Learn more: [Folder Layout](/docs/shifu-core/0.2.x/guide/layout)