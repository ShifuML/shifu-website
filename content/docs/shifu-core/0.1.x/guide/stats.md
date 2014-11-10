---
title: Stats
---

Step 1: Calculate Statistics
============================

Input / Output
--------------

###Input: 

* Raw Data
* ModelConfig - ``stats`` option group

###Output: 

* Updated ColumnConfig file, with the following stats computed:
    * max, min, mean, stdDev
    * ks, iv
    * binLength
    * binBoundary
    * binCategory
    * binCountNeg
    * binCountPos
    * binPosRate

Options
-------

####maxNumBins

The expected number of bins. The result ``binLength`` will be equal or smaller than this number.

* * *

####binningMethod

* ``EqualPositive``: bins tend to have euqal number of positive records
* ``EqualTotal``: bins tend to have equal number of total records

* * *

####sampleRate

Sampling rate, ``(0, 1]``

* * *

####sampleNegOnly

This option is useful when the majority of the records are negative(e.g. anomaly detection; PayPal transactions, where most of the transactions are legitimate). To increase the density of the positive records and to shrink the size of negative pool of records, set this to ``true`` .

* ``true``: only sample negative records but keep all the positive records
* ``false``: sample both positive and negative records


Folder Layout
-------------

At the end of this step, the ModelSet folder should contain the updated ColumnConfig and a new folder ``PreTrainStats`` under ``tmp``

    <ModelSetName>/
    ├───ModelConfig.json
    ├───ColumnConfig.json
    └───tmp/
        └───PreTrainStats/

Learn more: [Folder Layout](/docs/stable/guide/layout)
