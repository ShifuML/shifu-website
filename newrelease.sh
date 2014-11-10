#!/bin/bash

# newrelease.sh release_version new_version

prefix=content/docs

rm $prefix/stable 
ln -s $1 $prefix/stable

rm $prefix/snapshot
ln -s $2-snapshot $prefix/snapshot
