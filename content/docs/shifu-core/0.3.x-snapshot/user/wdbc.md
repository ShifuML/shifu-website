---
title: Wisconsin Diagnostic Breast Cancer Tutorial
---

Wisconsin Diagnostic Breast Cancer Tutorial
============================================

This tutorial trains a model on the [Wisconsin Diagnostic Breast Cancer](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)) data set.  The models tries to predict a diagnosis of **Benign** or **Malignant**.

Features are computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.

Install Shifu
-------------

**At this time there is no download link for 0.3.0-SNAPSHOT, please follow the steps to clone from Github and build it locally**

    $ git clone https://github.com/ShifuML/shifu-core.git
    $ cd shifu-core
    $ mvn install

This should install all the required packages into your local Maven repository.

Find the package in ``shifu-core/target`` folder(optionally you can move it to a desired location). Uncompress the package

    $ tar xvzf shifu-core-0.3.0-SNAPSHOT-release.tar.gz

Setup ``$SHIFU_HOME`` in your ``~/.bashrc`` or ``~/.bash_profile``

    export SHIFU_HOME=/path/to/shifu-core-0.3.0-SNAPSHOT
    PATH=$SHIFU_HOME/bin:$PATH



Make sure everything is setup

    $ source ~/.bashrc(or ~/.bash_profile)
    $ echo $SHIFU_HOME
    /path/to/shifu-core-0.3.0-SNAPSHOT
    $ which shifu
    /path/to/shifu-core-0.3.0-SNAPSHOT/bin/shifu

Find the example folder

    $ cd $SHIFU_HOME/example/wdbc

Step 1: Create PMML
-------------------

Create an initial PMML file with ``DataDictionary``, ``Model`` element, ``MiningSchema`` and ``Targets``

    $ shifu 1_create.json

the generated PMML file should be stored as ``model.xml`` or as you specified.

Checkout [PMML Standard](http://www.dmg.org/v4-2-1/GeneralStructure.html) page for more info.

Step 2: Calculate Stats
-----------------------

Calculate stats and add the ``ModelStats`` section in the PMML file.

    $ shifu 2_stats.json

Step 3: Variable Selection
--------------------------

Modify the ``MiningSchema`` based on the calculated stats; only the ``active`` fields will be used for training.

    $ shifu 3_varselect.json

Step 4: Create LocalTransformations
-----------------------------------

Create ``LocalTransformations`` in PMML file.

    $ shifu 4_transformprep.json

Step 5: Execute Transformation
------------------------------

Execute the transformation.

    $ shifu 5_transformexec.json

Checkout the result in ``generated`` folder

Step 6: Train
-------------

In this tutorial, we are using Encog for training, install Encog plugin by copying ``shifu-plugin-encog`` to ``$SHIFU_HOME/plugin`` folder(make sure you are using the jar with dependencies: ``shifu-plugin-encog-<version>-jar-with-dependencies.jar``):

    $ cd shifu-plugin-encog
    $ mvn package
    $ cp target/shifu-plugin-encog-<version>-jar-with-dependencies.jar $SHIFU_HOME/plugin

Then execute the request

    $ shifu 6_train.json

The trained models will be stored in the ``generated/models`` folder; the models will also be converted to PMML format and added as ``NeuralInput``, ``NeuralLayers`` and ``NeuralOutput``.

Step 7: Calculate Score
-----------------------

Use the trained model for scoring:

    $ shifu 7_modelexec.json

Scores will be stored in ``generated/score.json``

Step 8: Model Evaluation
------------------------

Calculate the performance:

    $ shifu 8_modeleval.json

The result will be stored in ``performance.json``
