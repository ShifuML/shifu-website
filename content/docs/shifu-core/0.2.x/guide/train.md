---
title: Train
---

Step 4: Train
==============

Command
-------

	$ shifu train

Input / Output
--------------

###Input

* Normalized Data
* ModelConfig - ``train`` option group

###Output
		
* models

Terms
-----

* ``masterSet``: the whole normalized dataset, loaded from the result of the previous stage.
* ``trainSet``: a subset of the ``masterSet``, result of bagging, used for training; each bag will have its own trainSet.
* ``validSet``: a subset of the ``masterSet``, result of bagging, used for calculating errors in each training epoch(iteration); each bag will have its own ``validSet``; ``validSet`` may or may not overlap with ``trainSet``.

Options
-------

#### baggingNum

The number of bags. To disable bagging, set ``baggingNum`` to ``0`` and ``baggingWithReplacement`` to ``false``

* * *

#### baggingWithReplacement

If true, records could be replicated for multiple times; otherwise each record will only appear in the training set for up to 1 time.

* * *

#### baggingSampleRate

This sample rate controls the actual size of the trainSet. 

If ``baggingWithReplacement`` is set to ``true``, the selectedSet size is 

$$ selectedSetSize = masterSetSize \times baggingSampleRate $$ 

the selection repeats ``selectedSetSize`` times, each time it randomly select one record from ``masterSet``(so there will be duplicates)

If ``baggingWithReplacement`` is set to ``false``, the selectedSet size is not a fixed number but each record is selected by comparing a generated random number with ``baggingSampleRate``.



* * *

#### validSetRate

The selectedSet is further divided into ``trainSet`` and ``validSet``; ``validSetRate`` is a number in ``[0,1)``.
(If validation set is 0%, models will be saved when train error goes down)

* * *

#### trainOnDisk

If true, will use disk for training whenever possible, to eliminate contraints of memory size

* * *

#### algorithm

* ``NN`` for Neural Network


* * *

### params

Parameters for the selected algorithm.

#### NN (Neural Network)

	"params" : {
		"NumHiddenLayers" : 2,
		"ActivationFunc" : [ "tanh", "sigmoid" ],
		"NumHiddenNodes" : [ 10, 10 ],
		"LearningRate" : 0.1,
		"Propagation" : "Q"
	}
	 
This is an example for NN, ``NumHiddenLayers`` means the number of hiden layer, it shoud be larger than 0.

``ActivationFunc`` is the activation function, the Shifu support these function:

		linear
		sigmoid
		tanh
		log
		sin
		
The function name is case insensitive

``NumHiddenNodes`` is the number of hidden node, the number should be larger than 0.


<div class="alert alert-warning">
<strong>Note</strong><br>
1. The size of NumHiddenNodes should be equal to ActivationFunc.<br>
2. The input layer will use linear as activation function and output layer use tanh function
</div>


``LearningRate``: used in ``Manhattan Propagation``, ``Back Propagation``, and ``Quick Propagation``.

``Propagation``: the propagation algorithm

* S : Scaled Conjugate Gradient (no learning rate required) 
* R : Resilient Propagation (no learning rate required)
* M : Manhattan Propagation (default learning rate = 0.00001)
* B : Back Propagation (default learning rate = 0.01)
* Q : Quick Propagation (default learning rate = 2.0)
		
This is the way how neural network update its weight and propagate.  

<!--
	
#### SVM (support vector machine)

		"params" : {
			"Kernel" : "linear",
			"Gamma" : 1.0,
			"Const" : 1.0
		}
		
``Kernel`` is the kernel of SVM used, it could be:

		linear,
		poly,
		sigmoid,
		rbf
		
Have fun in change kernel type in your training trip.

``Gamma`` parameter defines how far the influence of a single training example reaches, with low values meaning ‘far’ and high values meaning ‘close’.

``Const`` is a trade-off between training error and the flatness of the solution. The larger ``Const`` is the less the final training error will be. But if you increase C too much you risk losing the generalization properties of the classifier.

If ``Const`` is small, then the classifier is flat (meaning that its derivatives are small - close to zero, at least for the gaussian rbf kernel this is substantiated theoretically).

This [doc](http://www.csie.ntu.edu.tw/~cjlin/papers/guide/guide.pdf) describe more detail about this parameter.
-->


Folder Layout
-------------

At the end of this step, the ModelSet folder should have one more folder: ``models/``

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
		└───SelectedRawData/

Learn more: [Folder Layout](/docs/shifu-core/0.2.x/guide/layout)



