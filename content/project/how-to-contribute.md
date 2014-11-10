---
title: How To Contribute
---

How To Contribute
=================


Work As A Team
--------------

* [Working Agreement](../agreement)
* [ToolBox](../toolbox)

Get Started
-----------

### Fork and Clone

* Fork the repo that you would like to contribute from [GitHub](https://github.com/shifuml)
* Clone the repo from your fork

        $ git clone https://github.com/<your_fork>/shifu.git

* Use ``develop`` branch or create your own branch

        $ cd shifu
        $ git checkout develop

### Remotes

There should be 2 ``remote``s in your local clone:

* ``origin``: your own fork, ``https://github.com/<your_fork>/shifu.git``
* ``upstream``: Shifu's central repo, ``https://github.com/shifuml/shifu.git``

To setup and utilize the remotes:

* To add upstream 

        $ git remote add upstream https://github.com/ShifuML/shifu.git

* To sync up with upstream

        $ git pull upstream develop

* To push to your own fork

        $ git push origin develop

### Contribute Your Code

Send a ``Pull Request`` on GitHub. Make sure the target branch is ``develop``. The code will be reviewed.

### Report Issue

Create or comment on the issues on [Shifu's issue Tracker](https://github.com/ShifuML/shifu/issues)

