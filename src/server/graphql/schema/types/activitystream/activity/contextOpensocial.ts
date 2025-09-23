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

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { connections } from './opensocialConnections';

export const opensocial = new GraphQLObjectType({
  name: 'connectionsOpenSocial',
  description: 'Provides details of the context opensocial object',
  fields: {
    connections: {
      type: connections
    },
    published: {
      type: GraphQLString
    },
    rollupUrl: {
      type: GraphQLString
    },
    summary: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    updated: {
      type: GraphQLString
    }
  }
});
