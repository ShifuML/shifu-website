---
title: Fail Over
---



[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/guagua/)

Fail Over
=========

Fail over is supported in **Guagua** for both Hadoop MapReduce implementation and YARN implementation. By using **Guagua**, no worry about task failure, task will be restarted from last successful iteration (checkpoint).

Fail Over on MapReduce of Hadoop
--------

By using mapper tasks, fail-over is triggered when one mapper is failed and at most 4 times by default. But for Guagua, it should support restarting at last successful iteration. How to find last successful iteration? Guagua reads znodes from ZooKeeper and sorts them with iteration number and gets the maximal number as the last iteration. Then in restarted **Guagua** worker task, the initial iteration will be set to last successful iteration.

Fail Over on YARN of Hadoop
--------

## Restart failed tasks from last successful iteration

It is the same as the fail over on MapReduce.

## Task Fail Over Support

If one task is failed, how can it be restarted in Guagua YARN implemenation like MapReduce? In our GuaguaAppMaster, status for each task is tracked, if one is failed, another task with the same partition number will be restarted. Each task has maximal 4 attempts like MapReduce by default.
