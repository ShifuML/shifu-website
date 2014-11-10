---
title: Errors
---

#File System error

###1001: The input data is not found

Please check your source data, it should inluded some data

###1002: The pig_header is not found

Please check your source data, it's folder included .pig_header file.

###1003: Could not load ModelConfig

Check you {modelset}/ModelConfig file, make sure it exist

###1004: Could not write ModelConfig file

###1005: Could not load ColumnConfig

###1006: Could not write ColumnConfig file

###1007: Could not initialize the hdfs system

###1008: Could not initialize the local file system

###1009: Could not close the reader

Unable to close some reader, please restart your jvm

###1010: Could not delete local file, please manually delete it

Unable to delete local file

###1011: Could not delete hdfs file, please manually delete it

Unable to delete hdfs file

###1012: Could not running the pig job or pig job occur internal error, please check your pig log

###1013: Could not copy file to hdfs

#ModelConfig validation

###1051: Un-support algorithm, make sure your ModelConfig.json -> algorithm is NN/SVM/LR

###1052: Un-support mode, make sure your ModelConfig.json -> mode is "local" or "hdfs".

###1053: Un-support running mode, make sure your ModelConfig.json -> runMode is pig or akka

#Data validation

###1151: The input data length is more than column config

###1152: The input data length is less than column config

###1153: The input data length is not equal to column config size

#Model validation

###1250: The model file is not found