---
title: EvalScore
---

EvalScore
=========

Schema
------

The schema of the score file:

    tag|weight|mean|max|min|median|model0|model1...|meta0|meta1...

The number of columns in score file depends on the number of models and the number of meta columns.

* ``tag``: the first column, the **true** tag of the record
* ``weight``: the second column, the weight of the record, which is specified as ``weightColumnName`` in ``ModelConfig`` file
* scores columns: the **calculated** score of the record
    * ``mean``, ``max``, ``min``, ``median``: the derived scores
    * ``model0``, ``model1`` ...: the raw scores of each model.
* meta columns: the meta columns specified in ``scoreMetaColumnNameFile`` in ``ModelConfig`` file.

Input / Output
--------------

### As Output

Score files are generated when executing ``shifu eval``. Scores are calculated against the eval dataset using the trained models.

### As Input

Score files can be used to 

* investigate the individual cases
* calculate the confusion matrix. Learn more about the ``eval`` step in [Step 6: Evaluation](../../eval); learn more about the ``EvalConfusionMatrix`` file in [ConfusionMatrix](../confusionmatrix)
