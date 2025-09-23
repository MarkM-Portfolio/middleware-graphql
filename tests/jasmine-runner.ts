/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

const Jasmine = require('jasmine');
import { SpecReporter } from 'jasmine-spec-reporter';
const testSuite = process.env.TEST_SUITE;
const specDir = (testSuite === 'governor') ? `./lib/tests/${testSuite}` : `./tests/${testSuite}`;
let specRegex = (testSuite === 'governor') ? `**/*.spec.js` : `**/*.spec.ts`;
/* We're skipping the governor tests for all environments except on_prem */
if (testSuite === 'governor' && process.env.DEPLOYMENT_TYPE !== 'hybrid_cloud') {
  specRegex = 'noTestRegEx';
}

const jrunner = new Jasmine();
jrunner.env.clearReporters();
jrunner.addReporter(new SpecReporter());
jrunner.loadConfig({
  spec_dir: specDir,
  spec_files: [
    specRegex,
  ],
  stopSpecOnExpectationFailure: false,
  random: false,
});
jrunner.execute();
