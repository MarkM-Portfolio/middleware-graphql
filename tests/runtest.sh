# ***************************************************************** 
#                                                                   
# IBM Confidential                                                  
#                                                                   
# OCO Source Materials                                              
#                                                                   
# Copyright IBM Corp. 2018                                          
#                                                                   
# The source code for this program is not published or otherwise    
# divested of its trade secrets, irrespective of what has been      
# deposited with the U.S. Copyright Office.                         
#                                                                   
# ***************************************************************** 

set -e
echo 'Running Governor tests for middleware-graphql'
cd /usr/src/app/tests
sleep 30s
TEST_SUITE=governor node lib/tests/jasmine-runner.js
