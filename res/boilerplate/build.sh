#!/bin/sh

set -e

cd src
skeleton update-deps

cd ..
r.js -o build.js