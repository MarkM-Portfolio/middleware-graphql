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
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString
} from 'graphql';

export const connections = new GraphQLObjectType({
  name: 'activityStreamConnections',
  fields: {
    isAdmin: {
      type: GraphQLBoolean
    },
    isSearchIndexEnabled: {
      type: GraphQLBoolean
    },
    unreadNotifications: {
      type: GraphQLInt
    },
    unreadMentions: {
      type: GraphQLInt
    },
    snapshot: {
      type: GraphQLString
    }
  }
});
