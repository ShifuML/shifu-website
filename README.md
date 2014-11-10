Shifu Website
=============

Currently served internally at ``10.9.187.2`` or ``go/shifu``.

Update Website
--------------

Pushing code to GitHub does NOT update the served website. To manually update the content, copy the ``output`` folder to the server:

    $ scp -r /path/to/shifu-website/output stack@10.9.187.2:~/shifu-website

To add downloadable packages:

    $ scp -r /path/to/shifu-<version>.tar.gz stack@10.9.187.2:~/shifu-website/output/deliveries

Local Development
-----------------

Install ``guard`` and ``nanoc``:

    $ gem install guard
    $ gem isntall nanoc

To monitor the project and re-compile upon changes, use ``guard``:

    [/path/to/shifu-website] $ guard

To serve the website locally, use ``nanoc view``:

    [/path/to/shifu-website] $ nanoc view

