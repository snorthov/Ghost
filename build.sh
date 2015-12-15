#!/bin/bash
#
# npm version

echo "****" 
echo "****"
npm install -g grunt-cli
npm install
grunt init
grunt prod
#npm start --production
