---
title: Download Shifu
---

Download
--------

<div class="row">
	<div class="col-sm-3 col-md-3 col-lg-3 text-center-right theme-shifu">
		<span class="glyphicon glyphicon-cloud-download glyphicon-narrow"></span>
	</div>
	<div class="col-sm-9 col-md-9 col-lg-9 text-center-left theme-shifu">
		<p id="shifu-download" class="theme-shifu">Shifu Version 0.2.3</p>
		<p id="shifu-download-details">
            <a href="/release/shifu-0.2.3-cdh-20.tar.gz">tar.gz(Hadoop-0.20.x)</a> | 
            <a href="/release/shifu-0.2.3-hdp-yarn.tar.gz">tar.gz(Hadoop-2.x)</a> |
            <a href="/project/release-notes/#version-023">Release Notes</a></p>
	</div>
</div>

### Supported Platforms

* Linux is supported as a development and production platform. Both local and hdfs mode are supported if hadoop is installed in that machine.
* Win32 is supported as a development platform. Only local mode is supported in Win32.

### Required Software

Required software for Linux and Windows:

* Java 1.6.x or 1.7.x, preferably from Oracle, must be installed.
* To support hdfs mode, hadoop must be installed.

Additional requirements for Windows:

* Cygwin - Required for shell support in addition to the required software above.

Install
-------

Extract the package

    $ tar xvzf shifu-<version>.tar.gz

Edit ``~/.bash_profile`` or ``~/.bashrc``

    export SHIFU_HOME=/path/to/shifu-<version>
    PATH=$SHIFU_HOME/bin:$PATH

Activate

    $ source ~/.bash_profile

Double check

    $ which shifu

    $ shifu version

