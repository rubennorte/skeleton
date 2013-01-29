#!/bin/sh

set -e

cd $(dirname $0)/..

skeleton update-deps
r.js -o scripts/build.js