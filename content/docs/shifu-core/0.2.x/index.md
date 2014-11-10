---
title: Shifu
---

Shifu
=====

Version: <select id="shifu-core-version"></select>

## User Guide



Want to use Shifu on your own data?  This user guide covers concepts, workflows and interfaces to get Shifu running on your own data. 

If you'd like to contribute to make Shifu better, please see [How to Contribute](/project/about/#how-to-contribute).

### User Interface


* [Command-Line Interface](guide/cli)




### Key Files

#### Environment

* [shifuconfig](guide/shifuconfig)

#### Config

* [ModelConfig](guide/modelconfig)
* [ColumnConfig](guide/columnconfig)

#### Generated

* [NormalizedData](guide/files/normalizeddata)
* [EvalScore](guide/files/evalscore)
* [EvalConfusionMatrix](guide/files/evalconfusionmatrix)


### Steps


* [Step 0: Initialization](guide/init)
* [Step 1: Calculate Statistics](guide/stats)
* [Step 2: Variable Selection](guide/varselect)
* [Step 3: Normalization](guide/normalize)
* [Step 4: Train](guide/train)
* [Step 5: Post-Train](guide/posttrain)
* [Step 6: Evaluation](guide/eval)
* [Step 7: Integration](guide/integration)

### More Info


* [Folder Layout](guide/layout)


Tutorial
--------

The following tutorials show how Shifu can be used to train and evaluate neural network models. 


### Wisconsin Diagnostic Breast Cancer Tutorial

This tutorial trains a model on the [Wisconsin Diagnostic Breast Cancer](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)) data set.  The models tries to predict a diagnosis of **Benign** or **Malignant**.

Features are computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.

This tutorial illustrates the following Shifu functionality.

*  Computing [variable statistics](guide/stats)
*  Automated [variable selection](guide/varselect) based on KS ranking
*  Data set [variable normalization](guide/normalize) 
*  Distributed neural network [model training](guide/train) on Hadoop
*  Model [performance evaluation](guide/eval)

<a href="tutorials/wdbc" class="btn btn-success">Go to the WDBC Tutorial</a>
