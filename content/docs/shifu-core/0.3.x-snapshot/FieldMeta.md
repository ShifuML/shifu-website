FieldMeta
=========

This is a proposed new schema for field meta. It is an extension of old ColumnConfig and a close resemblance to PMML.

This is based on the feedbacks that:

* PMML is limited adopted, outputting PMML should be optional
* XML is hard to work with in backend JAVA and web app JAVASCRIPT

This JSON format will be used as internal data structure and can be optionally converted to older SHIFU versions or to PMML


    FieldMeta: {
        version: Number,
        fields: [
            {
                fieldBasics: {
                    name: String,
                    num: Number,
                    datatype: STRING | NUMBER | BOOLEAN | DATETIME
                    optype: CONTINUOUS | CATEGORICAL | ORDINAL
                },
                fieldStats: {
                    counts: {
                        totalFreq: NUMBER,
                        missingFreq: NUMBER,
                        invalidFreq: NUMBER,
                        cardinality: NUMBER
                    },
                    continuousStats: {
                        min: NUMBER,
                        max: NUMBER,
                        mean: NUMBER,
                        stdDev: NUMBER,
                        median: NUMBER,
                        interQuartileRange: NUMBER,
                        totalValuesSum: NUMBER,
                        totalSquaresSum: NUMBER,
                        quantile: [[quantileLimit:NUMBER, quantileValue:NUMBER]],
                        binBoundaries: [NUMBER],
                        binCounts: [NUMBER],
                        byClass: {
                            <CLASSNAME_1>: {
                                min: NUMBER,
                                max: NUMBER,
                                mean: NUMBER,
                                stdDev: NUMBER,
                                median: NUMBER,
                                binCounts: [NUMBER],
                                binWeightedCounts: [NUMBER]
                            },
                            <CLASSNAME_2>: {
                                ...
                            }
                        }
                    },
                    discreteStats: {
                        binCategory: [STRING],
                        binCounts: [NUMBER],
                        modalValue: STRING
                        byClass: {
                            <CLASSNAME_1>: {
                                binCounts: [NUMBER],
                                binWeightedCounts: [NUMBER],
                                modalValue: STRING
                            },
                            <CLASSNAME_2>: {
                                ...
                            }

                        }

                    },
                    extensions: (user-defined, generic key-value pairs){
                        ks: NUMBER,
                        iv: NUMBER,
                        binWOE: [NUMBER],
                        binPosRate: [NUMBER],
                        binAvgScore: [NUMBER]
                    }
                },
                fieldControl: {

                }
            }
        ]
    }
