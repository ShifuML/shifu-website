---
title: EvalConfusionMatrix
---

EvalConfusionMatrix
===================

Schema
------

    tp|fp|fn|tn|weightedTp|weightedFp|weightedFn|weightedTn|score

Input / Output
--------------

### As Output

This is the output of the confusion matrix step. The score file is loaded and sorted, then the confusion matrix is calculated.

### As Input

Confusion matrix will be used to calculate performance matrix. Learn more about the ``eval`` step in [Step 6: Evaluation](../../eval); learn more about the ``EvalPerformance`` file in [EvalPerformance](../evalperformance)

