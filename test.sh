#!/bin/bash

node_ver=`node -v | cut -d . -f1 | tr -d "v"`
# echo $node_ver
npm_ver=`npm -v | cut -d . -f1 | tr -d "v"`
# echo $npm_ver

if [ $node_ver -ge 19 ] && [ $npm_ver -ge 9 ]; then
# if [[ $node_ver -ge 19 && $npm_ver -ge 9 ]]; then
	echo "IF"
else
	echo "ELSE"
	echo $node_ver $npm_ver
fi