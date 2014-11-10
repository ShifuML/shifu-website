---
title: Normalization
---

Step 3: Normalization
======================

Input/Output
------------

###Input: 

* Raw Data
* ColumnConfig(with ``finalSelect``)

###Output: 

* Normalized Data


Description
-----------

Depend on the type of the column, the normalization is calculated as follows

* Numerical: [z-Score](http://en.wikipedia.org/wiki/Standard_score) is calculated
* Categorical: use ``binPosRate`` of the certain category as the numerical data, then ``z-Score`` is calculated


Options
-------

#### stdDevCutOff

This value is used to cut off outliers. The values larger than 

$$ \verb+maxCutOff+ = \mu + \verb+stdDevCutOff+ * \delta$$

will be set as ``maxCutOff``, values smaller than

$$ \verb+minCutOff+ = \mu - \verb+stdDevCutOff+ * \delta$$

wil be set as ``minCutOff``. Where $$\mu$$ is the mean, $$\delta$$ is the standard deviation.

* * *

#### sampleRate

``sampleRate`` should be a number between 0 and 1, only the randomly sampled data will go through normalization and be used for training. To disable sampling, simply set the value to 1.

* * *

#### sampleNegOnly

If true, will only sample the Neg records, all Pos records will be normalized. This is used to increase the Pos population.  

Folder Layout
-------------

At the end of this step, the ModelSet folder should have two more folders under tmp: ``NormalizedData`` and ``SelectedRawData``.

    <ModelSetName>/
    ├───ModelConfig.json
    ├───ColumnConfig.json
    └───tmp/
        ├───PreTrainStats/
        ├───NormalizedData/
        └───SelectedRawData/

Learn more: [Folder Layout](/docs/stable/guide/layout)