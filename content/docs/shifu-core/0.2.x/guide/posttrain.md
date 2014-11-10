---
title: Post-Train Stats
---

Step 5: Post-Train Stats
=========================

Command
-------

    $ shifu posttrain


Input / Output
--------------

* ### Input
    * Raw Data
    * ModelConfig
    * ColumnConfig
    * models
* ### Output
    * TrainDataScore
    * BinAvgScore

Description
-----------

This will score the training dataset and update ``ColumnConfig`` with ``binAvgScore``.

Options
-------

There are no configurations for this stage and this is optional.



Folder Layout
-------------

At the end of this step, the ModelSet folder should have two more folders under ``tmp/``: ``TrainDataScore/`` and ``BinAvgScore``.

    <ModelSetName>/
    ├───ModelConfig.json
    ├───ColumnConfig.json
    ├───models/
    │   ├───model0 
    │   ├───model1
    │   ├───model2
    │   └───...
    └───tmp/
        ├───PreTrainStats/
        ├───NormalizedData/
        ├───SelectedRawData/
        ├───TrainDataScore/
        └───BinAvgScore/

Learn more: [Folder Layout](/docs/shifu-core/0.2.x/guide/layout))
