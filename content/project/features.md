Features
========

Variable Stats
--------------

### Functions

* [Existing] UnivariateStats(http://www.dmg.org/v4-2-1/Statistics.html#xsdElement_UnivariateStats)
    * Counts
    * NumericInfo
    * DiscrStats
    * ContStats
* [TODO] MultivariateStats
* [TODO] ANOVA
* [Existing] Binary Class Binning
    * EqualTotal
    * EqualPositive
* [Existing] KS, IV, WOE


### Mode

* [Existing] Local
* [Existing] Pig
* [Experimental] Spark



Variable Selection
------------------

* by KS
* by IV

Normalization
-------------

* ZScore
* WOE

Train
-----

* [Existing] Encog
    * Local
    * Distributed(via Guagua)
    * Bagging
* [Experimental] Spark
* [Experimental] Mahout
* [TODO] H2O

Evaluation
----------

* Model Execution
* Model Evaluation
    * (Binary Class)Confusion Matrix
    * Curves: PR, ROC, Gains

PMML Support
------------

