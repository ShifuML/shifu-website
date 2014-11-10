---
title: Request
---

Request
=======

Structure
---------

### Request



    {
        "name": (String),
        "description": (String),
        "processor": (Binding, defines the top level processor, e.g. to calculate stats, normalize or train)           
        "bindings": (List of Binding, detailed implementations)
    }

### Binding

Defines the interface, implementation and params. Specified implementation class will be injected.

    {
        "spi": (String, the interface defined in shifu-core),
        "impl": (String, the implementation class name, either built-in or provided in plugins),
        "params": (Key-Value pairs)
    }

### Params

Key-Value pairs, no fixed format, user define impl is responsible to read and react according to the params

### Fields

A special item in Params. Use "fields" to define per-field settings.

``namePattern`` is used for matching field names; currently support exact matching and ``$default``, which will be used for all fields that are not explicitly specified.

    "fields": [
        {
          "namePattern": "id",
          "params": {
            "optype": "ordinal"
          }
        },
        {
          "namePattern": "diagnosis",
          "params": {
            "optype": "categorical",
            "dataType": "string"
          }
        },
        {
          "namePattern": "$default",
          "params": {
            "optype": "continuous"
          }
        }
    ]

Example
-------

    {
      "name": "TestCreatePMMLElementRequest",
      "description": "A test request",
      "processor": {
          "spi": "RequestProcessor",
          "impl": "ml.shifu.core.di.builtin.processor.CreatePMMLElementRequestProcessor",
          "params": {
            "pathPMML": "src/test/resources/models/wdbc/new/generated/model.xml"
          }
        },
      "bindings": [    
        {
            "spi": "PMMLDataDictionaryCreator",
            "impl": "ml.shifu.core.di.builtin.datadictionary.CSVPMMLDataDictionaryCreator",
            "params": {
              "delimiter": "|",
              "pathCSV": "src/test/resources/models/wdbc/All/wdbc.header",
              "fields": [
                {
                  "namePattern": "id",
                  "params": {
                    "optype": "ordinal"
                  }
                },
                {
                  "namePattern": "diagnosis",
                  "params": {
                    "optype": "categorical",
                    "dataType": "string"
                  }
                },
                {
                  "namePattern": "$default",
                  "params": {
                    "optype": "continuous"
                  }
                }
              ]
            }
          },
        {
          "spi": "PMMLModelElementCreator",
          "impl": "ml.shifu.core.di.builtin.DefaultPMMLModelElementCreator",
          "params": {
            "modelType": "NeuralNetwork",
            "modelName": "demoModel"
          }
        },
        {
          "spi": "PMMLTargetsCreator",
          "impl": "ml.shifu.core.di.builtin.targets.BinaryPMMLTargetsCreator",
          "params": {
            "modelName": "demoModel",
            "targetFieldName": "diagnosis",
            "posFieldValue": "M",
            "posFieldDisplayValue": "Malignant",
            "negFieldValue": "B",
            "negFieldDisplayValue": "Benign"
          }
        },
        {
          "spi": "PMMLMiningSchemaCreator",
          "impl": "ml.shifu.core.di.builtin.miningschema.DefaultPMMLMiningSchemaCreator",
          "params": {
            "modelName": "demoModel",
            "fields": [
              {
                "namePattern": "id",
                "params": {
                  "usageType": "supplementary"
                }
              },
              {
                "namePattern": "diagnosis",
                "params": {
                  "usageType": "target"
                }
              },
              {
                "namePattern": "$default",
                "params": {
                    "usageType": "active"
                }
              }
            ]
          }
        }
      ]
    }