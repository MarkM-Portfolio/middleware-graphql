#!/bin/sh
# *****************************************************************
#
# IBM Confidential
#
# OCO Source Materials
#
# Copyright IBM Corp. 2018, 2019
#
# The source code for this program is not published or otherwise
# divested of its trade secrets, irrespective of what has been
# deposited with the U.S. Copyright Office.
#
# *****************************************************************

INSPECT=""
HEAP=""

if [ ! -z "${NODEJS_HEAP_MEMORY}" ]; then
    HEAP="--max-old-space-size=${NODEJS_HEAP_MEMORY} "
fi

if [ ! -z "${NODEJS_DEBUG}" ]; then
    INSPECT="--inspect=0.0.0.0:9229"
fi

NODE_ARGS="${HEAP}${INSPECT}"
echo "NODE_ENV=production node ${NODE_ARGS} lib/server/server.js"
NODE_ENV=production node ${NODE_ARGS} lib/server/server.js
