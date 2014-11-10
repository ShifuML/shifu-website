---
title: shifuconfig
---

shifuconfig
===========

Environment settings are loaded from ``shifuconfig``. 

Location and Priority
---------------------

There are 3 tiers of ``shifuconfig`` 
    
* ``${SHIFU_HOME}/conf/shifuconfig``
* ``/etc/shifuconfig``
* ``~/.shifuconfig``

Shifu will try to find above three configuration files and load them if existing. ~/.shifuconfig will be loaded at last, so the setting in it will highest priority.


Setting
-------

    # zookeeperServers is used for distributed training 
    zookeeperServers=
    
    # hadoopNumParallel is for parallelity for when using mapreduce mode
    hadoopNumParallel=40
    
    # hadoopJobQueue specifies the hadoop job queue
    hadoopJobQueue=default
    
    # localNumParallel is for parallelity for when using local mode
    localNumParallel=6

#### zookeeperServers

zookeeperServers should not be null, if you want to use distribute training

#### hadoopNumParallel

Increase hadoopNumParallel when you try to use ``mapred`` to run shifu and your data size is very large

#### hadoopJobQueue

hadoopJobQueue specifies which queue to use

#### localNumParallel

localNumParallel specifies the parallelity of using ``local`` mode