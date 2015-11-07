#!/bin/bash

grunt build
mkdir dist/scripts
cp scripts/postinstall.js dist/scripts/
modulus deploy dist -p "gAmPIe"

