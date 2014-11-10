---
title: Quick Start
---

[<img src="../images/guagua_duck_50.png" alt="Guagua" align="right">](http://shifu.ml/docs/stable/guide/guagua/)

Prerequisites
---------
* Java 1.6.x or 1.7.x, preferably from Oracle, must be installed.
* Maven 2.x or 3.x must be installed.
* Hadoop 0.20.2 or 1.2.0 or 2.2.0 must be installed.
* ZooKeeper server must be installed or provided.

Get Guagua
--------- 

## Source Code

1. Clone code 
[https://github.com/shifuml/guagua](https://github.com/shifuml/guagua)
2. Compile: 
`sh package.sh`

## Maven

Since no package in center maven repository. Please install Guagua in your local repository firstly in the first step.
Then add below dependency in your own pom.xml:

	#!java
	<dependency>
		<groupId>ml.shifu</groupId>
		<artifactId>guagua-mapreduce</artifactId>
		<version>${guagua.version}</version>
		<classifier>hadoop1(or hadoop2)</classifier>
	</dependency>

How to use it, you can check our distributed application in [Shifu source code](https://github.com/ShifuML/shifu/tree/master/src/main/java/ml/shifu/shifu/core/processor/TrainModelProcessor.java#L240)

## Get package

After packaging, you will get one pakage called guagua-${version}.tar.gz in guagua-client/target/. Copy it to your Hadoop CLI machine. 

Master And Worker Classes
---------

Let's use simple sum logic as an example. Sum Guagua apllication is a hello-world example for Guagua. In this application, input for each line is a number. Each worker will accumulate sum value of all the input numbers and last master sum value together. Then the new sum value will be sent to master. In master, all sum values from workers will be accmulated to be a new global sum value which is sent to workers for their next iteration.

## Define Master Logic
	
	#!java
	public class SumMaster implements
			MasterComputable<GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>> {

		private static final Logger LOG = LoggerFactory.getLogger(SumMaster.class);

		@Override
		public GuaguaWritableAdapter<LongWritable> compute(
				MasterContext<GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>> context) {
			long sum = 0l;
			if(context.getWorkerResults() == null) {
				LOG.info("Master accumulates worker results with null or empty.");
				return null;
			}
			for(GuaguaWritableAdapter<LongWritable> longWritable: context.getWorkerResults()) {
				if(longWritable != null) {
					sum += longWritable.getWritable().get();
				}
			}
			LOG.info("master:{}", sum);
			GuaguaWritableAdapter<LongWritable> result = new GuaguaWritableAdapter<LongWritable>(new LongWritable(sum));
			if(sum >= 1000000) {
				result.setHalt(true);
			}
			return result;
		}
	}

## Define Worker Logic
	
	#!java
	public class SumWorker
			extends
			AbstractWorkerComputable<GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<Text>> {

		private static final Logger LOG = LoggerFactory.getLogger(SumWorker.class);

		private List<Long> list;

		@Override
		public void init(
				WorkerContext<GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>> workerContext) {
			this.list = new LinkedList<Long>();
		}

		@Override
		public GuaguaWritableAdapter<LongWritable> doCompute(
				WorkerContext<GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>> workerContext) {
			long sum = workerContext.getLastMasterResult() == null ? 0l : workerContext.getLastMasterResult().getWritable()
					.get();
			for(long longValue: this.list) {
				sum += longValue;
			}
			LOG.info("worker: {} ; sum: {}", workerContext, sum);
			GuaguaWritableAdapter<LongWritable> result = new GuaguaWritableAdapter<LongWritable>(new LongWritable(sum));

			return result;
		}

		@Override
		public void load(GuaguaWritableAdapter<LongWritable> currentKey, GuaguaWritableAdapter<Text> currentValue,
				WorkerContext<GuaguaWritableAdapter<LongWritable>, GuaguaWritableAdapter<LongWritable>> workerContext) {
			this.list.add(Long.parseLong(currentValue.getWritable().toString()));
		}

		@Override
		public void initRecordReader(GuaguaFileSplit fileSplit) throws IOException {
			this.setRecordReader(new GuaguaLineRecordReader());
			this.getRecordReader().initialize(fileSplit);
		}
	}

Launch Guagua
---------

## Pre-requirements

ZooKeeper server should be provided by using '-z' parameter. Unzip your guagua-${version}.tar.gz and change folder to bin.

## Launch command (0.4.0)

	#!bash
	#!/bin/bash

	./guagua -Dmapred.job.queue.name=default \
        -Dguagua.sum.output=sum-output \
        -Dguagua.master.intercepters=ml.shifu.guagua.mapreduce.example.sum.SumOutput \
        ../mapreduce-lib/guagua-mapreduce-examples-0.4.0.jar \
        -i ${sum-input}  \
        -z ${zookeeper.server}  \
        -w ml.shifu.guagua.mapreduce.example.sum.SumWorker  \
        -m ml.shifu.guagua.mapreduce.example.sum.SumMaster  \
        -c 10 \
        -n "Guagua-Sum-Master-Workers-Job" \
        -mr org.apache.hadoop.io.LongWritable \
        -wr org.apache.hadoop.io.LongWritable

