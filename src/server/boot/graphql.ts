/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017, 2019                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { printSchema } from 'graphql';
import { graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { isAuthenticated, sanitizeHeaders } from '@connections/utils-orient-server';
import { getSchema, resolverObj } from '../graphql';
import { formatParamsHandler } from '../utils/graphqlHelper';
import { LoggerUtils } from '../../utils';

const TITLE = 'graphql';
const logger = LoggerUtils.getLogger(TITLE);
const loggerGraphQL = { log: (e) => logger.error(e.stack) };

function setUpGraphQLServer(schema, router) {
  logger.info(TITLE, 'Schema received');
  router.post('/graphql*', isAuthenticated({ redirectToHomepageLogin: false, resetAuthHeader: true }), graphqlExpress((req, res) => {
    const DEFAULT_ORG_ID = 'a';
    const mockResolvers = !!req.query.mockResolvers;
    let userId;
    let emailId;
    let orgId;
    if (res.locals.user) {
      orgId = res.locals.user.orgid ? res.locals.user.orgid : DEFAULT_ORG_ID;
      if (res.locals.user.emails) {
        emailId = res.locals.user.emails[0].value;
      } else if (res.locals.user.email) {
        emailId = res.locals.user.email;
      }
      userId = res.locals.user.userid;
    }
    let sessionId;
    if (req.query) {
      sessionId = req.query.sessionId;
    }
    const scHeader = sanitizeHeaders(req);
    const executableSchema = makeExecutableSchema({
      typeDefs: printSchema(schema),
      resolvers: resolverObj
    });
    const configuration = {
      schema: executableSchema,
      logger: loggerGraphQL,
      context: {
        headers: scHeader,
        userId,
        emailId,
        sessionId,
        orgId,
        mockResolvers,
        isOauth: res.locals.isOauth
      },
      formatParams: formatParamsHandler
    };
    return configuration;
  }));
}

module.exports = function(server) {
  const router = new server.loopback.Router();
  getSchema()
  .then((schema) => {
    server.healthy = true;
    setUpGraphQLServer(schema, router);
  })
  .catch((error) => {
    logger.error(TITLE, 'Couldn\'t fetch the Schema', error);
    logger.info(TITLE, 'Trying to fetch the Schema again');
    getSchema()
    .then((schema) => {
      server.healthy = true;
      setUpGraphQLServer(schema, router);
    })
    .catch((e) => {
      logger.error(TITLE, 'Couldn\'t fetch the Schema', e);
    });
  });
  server.use(router);
};
