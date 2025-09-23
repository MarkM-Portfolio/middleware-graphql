/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017, 2018                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { graphiqlExpress } from 'graphql-server-express';
import * as cookieParser from 'cookie-parser';

module.exports = (server) => {
  server.use(cookieParser());
  const router = new server.loopback.Router();
  router.get('/graphiql', graphiqlExpress({
    endpointURL: '/mock'
  }));
  server.use(router);
};
