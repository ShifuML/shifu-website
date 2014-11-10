---
title: Quick Start
---

Quick Start
===========

> This is a quick start for the impatient. All the settings are pre-cooked in the ModelConfig file. For a full-length tutorial of the same data set, check out the [Tutorial - WDBC](../wdbc) page

Preparation
-----------

### Prepare Shifu

Please find the instructions on the [Install](/project/install) page 

### Prepare Data

Find the ``wdbc`` folder

    wdbc
    ├───wdbcDataSet/
    │   ├───wdbc.data
    │   ├───wdbc.train
    │   ├───wdbc.eval
    │   └───wdbc.header
    ├───wdbcModelSetLocal/
    │   └───ModelConfig.json
    └───wdbcModelSetHDFS/
        └───ModelConfig.json

Train the Model
---------------

Inside ``wdbcModelSetLocal`` folder:

#### Generate initial ColumnConfig.json

    $ shifu init

Verify the ``ColumnConfig.json`` is created and ``columnNum``, ``columnName``, ``columnType``, ``columnFlag`` are correctly setup.

#### Calculate stats and distributions

    $ shifu stats

Open ``ColumnConfig.json`` again, the columns with ``columnType`` set to ``N``(numerical) or ``C``(categorical) should be populated with ``columnStats`` and ``columnBinning``.

For a pretty print, update the ``ColumnConfig.json`` to [http://10.9.187.2:8080/columnconfig](http://10.9.187.2:8080/columnconfig)

#### Variable Selection
    
    $ shifu varselect

Still the ``ColumnConfig.json``, the selected columns will be marked as ``finalSelect: true``

#### Normalization
    
    $ shifu normalize

Now data is normalized as z-Score, stored in ``tmp/NormalizedData`` folder.

#### Training
    
    $ shifu train

The errors step down after each iteration. After everything is settled, checkout the ``models`` folder.

#### Evaluation

    $ shifu eval 

Calculate score, confusion matrix and performance curves against the evaluation dataset.

Upload the performance file to [http://10.9.187.2:8080/performance](http://10.9.187.2:8080/performance) to see the curves


