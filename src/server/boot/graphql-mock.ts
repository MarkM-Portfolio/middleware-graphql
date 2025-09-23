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

import { printSchema } from 'graphql';
import { graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { LoggerUtils } from '../../utils';
const TITLE = 'graphql-mock';
const logger = LoggerUtils.getLogger(TITLE);
import { getSchema, mockObj, resolverObj } from '../graphql';

const loggerGraphQL = { log: (e) => logger.error(e.stack) };

function setUpGraphQLServer(schema, router) {
  logger.info(TITLE, 'Schema received');
  router.post('/mock*', graphqlExpress(() => {
    const executableSchema = makeExecutableSchema({
      typeDefs: printSchema(schema),
      resolvers: resolverObj
    });

    addMockFunctionsToSchema({
      schema: executableSchema,
      mocks: mockObj,
      preserveResolvers: false
    });

    const configuration = {
      schema: executableSchema,
      logger: loggerGraphQL
    };

    return configuration;
  }));
}

module.exports = function(server) {
  const router = new server.loopback.Router();
  getSchema()
  .then((schema) => {
    setUpGraphQLServer(schema, router);
  })
  .catch((error) => {
    logger.error(TITLE, 'Couldn\'t fetch the Schema', error);
    logger.info(TITLE, 'Trying to fetch the Schema again');
    getSchema()
    .then((schema) => {
      setUpGraphQLServer(schema, router);
    })
    .catch((e) => {
      logger.error(TITLE, 'Couldn\'t fetch the Schema', e);
    });
  });
  server.use(router);
};
