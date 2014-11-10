---
title: CLI
---

Command-Line Interface
======================

Preparation
-----------

Create a new ModelSet

    $ shifu new <MODEL_SET_NAME>

Change to ModelSet directory

    $ cd <MODEL_SET_NAME>

Edit ModelConfig.json. Checkout [ModelConfig](/docs/stable/guide/modelconfig) page for options.

Model Training
--------------

#### Step 0. Generate initial ColumnConfig.json

    $ shifu init

#### Step 1. Calculate basic stats(including binning, KS/IV)

    $ shifu stats

#### Step 2. Variable Selection
    
    $ shifu varselect

#### Step 3. Normalization
    
    $ shifu normalize

#### Step 4. Training
    
    $ shifu train

#### Step 5. Post Training

    $ shifu posttrain

#### Step 6. Evaluation

Run all evals

    $ shifu eval 

Run evals by name

    $ shifu eval <EVAL_NAME_1> <EVAL_NAME_2>
