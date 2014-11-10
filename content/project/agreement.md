---
title: Working Agreement
---

Working Agreement
=================

Code Branching
--------------

* Three fixed branches 
    * ``master``: latest released version 
    * ``release``: staged features and bugfixes 
    * ``develop``: in-progress, SNAPSHOT version 
* Fork and Pull Request Model

The strategy is similar to [Git-flow](http://nvie.com/posts/a-successful-git-branching-model/), except for:

* we discourage publishing feature branches; use feature branches only locally or in your own fork
* use one fixed ``release`` branch instead of multiple, versioned release branches.


Versioning
----------

Shifu uses [Semantic Versioning](http://semver.org/).

``MAJOR.MINOR.PATCH``

Note:

* Currently ``MAJOR`` stays at 0, which indicates ``MINOR`` upgrades do not guanrantee backward compatibility.
* Any ``patch`` level update should **NOT** introduce new features or change the format of configuration files and generated files.



Code Conventions
----------------

### For all code

* Use 4 spaces as indent
* Do not use ``@author`` and time tags. Let git track contributions.

### Java

* Follow the [Code Conventions for the Java Programming Language](http://www.oracle.com/technetwork/java/javase/documentation/codeconvtoc-136057.html)
* Use [TestNG](http://testng.org/doc/index.html) for unit-test

### Pig

* **UPPERCASE** type indicates elements the system supplies.
* **lowercase** type indicates elements that you supply.


Release Checklist
-----------------

### Shifu Code Repository

* Make sure all the code changes are checked-in to ``release`` branch
* Make sure all the examples are updated if there are changes in file schema
* From ``release`` branch(it may ask for your GitHub account):

        $ mvn release:clean release:prepare

* From ``release`` branch

        $ mvn release:perform

* From ``master`` branch: pull from the released tag

        $ git pull origin tags/shifu-<version>

* From ``develop`` branch: merge changes in ``release`` branch

        $ git pull origin release

### Shifu Website

* Update "Release Notes" page: ``content/project/release_notes.md``
* Update "Download" link: ``content/project/download.md``
* Upload ``.tar.gz`` file to shifu website server release folder: ``~/shifu-website/output/release``
* Compile website by executing ``nanoc`` or ``guard``
* Push website to GitHub

        $ git push origin master

* Upload website to server

        $ git push server master

* Hop on to server

        $ ssh shifuserver
        $ cd shifu-website

* Pull from local repository

        $ git pull

* Verify the website is updated: www.shifu.ml

