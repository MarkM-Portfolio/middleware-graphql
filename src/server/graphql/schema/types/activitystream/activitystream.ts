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
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import { connections } from './connections';
import { activityEntry } from './activity/entry';

export const activitystream = new GraphQLObjectType({
  name: 'activitystream',
  description: 'The ActivityStream Schema',
  fields: {
    connections: {
      type: connections
    },
    list: {
      type: new GraphQLList(activityEntry)
    },
    sorted: {
      type: GraphQLBoolean
    },
    filtered: {
      type: GraphQLBoolean
    },
    itemsPerPage: {
      type: GraphQLInt
    },
    startIndex: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    totalResults: {
      type: GraphQLInt
    },
    updatedSince: {
      type: GraphQLString
    },
    sessionId: {
      type: GraphQLInt
    }
  }
});
