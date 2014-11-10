---
title: Neural Network Master Workers Algorithm
---

[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/stable/guide/guagua/)

This graph describes distributed neural network iteration algorithm. 

![distributed neural network](../images/nn-masterworkers.png)

In each iteration:

* Data are split by workers.
* Each worker computes its own neural network gradients and sends them to master.
* Master accumulates all gradients and updates global neural network weights and then sends global weights to all workers for next iteration.