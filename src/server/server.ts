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

import loopback = require('loopback');
import boot = require('loopback-boot');
import * as bodyParser from 'body-parser';
import { LoggerUtils } from '../utils';
import { configure } from './utils/environmentConfiguration';

configure();
const app = module.exports = loopback();
const logger = LoggerUtils.getLogger('server');

app.start = () => {
  // start the web server
  return app.listen(() => {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    logger.info('Web server listening at: %s', baseUrl);
  });
};

/**
 * Add middleware for Orient POC - passport aut and auto login checks
 * @param  {Object} server [Express server]
 */
function createExtraMiddleware(server) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // this is needed whenever the cloud sandbox had an auto signed certificate
  server.use(bodyParser.json());
}

createExtraMiddleware(app);

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, (err) => {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});
