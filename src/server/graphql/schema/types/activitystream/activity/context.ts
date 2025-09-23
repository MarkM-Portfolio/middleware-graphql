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
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import { authorType as actor } from '../../common/openSocial/author';
import { opensocial } from './contextOpensocial';

export const context = new GraphQLObjectType({
  name: 'context',
  description: 'Provides details of the context object of the tile',
  fields: {
    actor: {
      type: actor
    },
    connectionsContentUrl: {
      type: GraphQLString
    },
    containerid: {
      type: GraphQLString
    },
    communityid: {
      type: GraphQLString
    },
    correlationid: {
      type: GraphQLString
    },
    eventId: {
      type: GraphQLString
    },
    eventTitle: {
      type: GraphQLString
    },
    eventType: {
      type: GraphQLString
    },
    iconUrl: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
    isPublic: {
      type: GraphQLString
    },
    itemUrl: {
      type: GraphQLString
    },
    numComments: {
      type: GraphQLInt
    },
    numLikes: {
      type: GraphQLInt
    },
    opensocial: {
      type: opensocial
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
      type: GraphQLBoolean
    }
  }
});
