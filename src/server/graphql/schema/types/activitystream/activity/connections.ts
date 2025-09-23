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

export const connections = new GraphQLObjectType({
  name: 'activityConnections',
  description: 'Contains connections specific extensions to the ActivityStream Entry',
  fields: {
    atomUrl: {
      type: GraphQLString
    },
    broadcast: {
      type: GraphQLString
    },
    containerId: {
      type: GraphQLString
    },
    containerName: {
      type: GraphQLString
    },
    plainTitle: {
      type: GraphQLString
    },
    followedResource: {
      type: GraphQLString
    },
    isPublic: {
      type: GraphQLString
    },
    isTypeAHeadEnabled: {
      type: GraphQLString
    },
    likeService: {
      type: GraphQLString
    },
    organizationId: {
      type: GraphQLString
    },
    read: {
      type: GraphQLString
    },
    rollupUrl: {
      type: GraphQLString
    },
    rollupid: {
      type: GraphQLString
    },
    saved: {
      type: GraphQLString
    },
    shortTitle: {
      type: GraphQLString
    },
    communityid: {
      type: GraphQLString
    }
  }
});
