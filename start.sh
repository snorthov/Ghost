#!/bin/bash
#
# npm version

npm install -g grunt-cli
npm install
grunt init
grunt prod
npm start --production
