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
  GraphQLList,
  GraphQLBoolean
} from 'graphql';

import { timeBoxes } from './timeBoxes';

export const connections = new GraphQLObjectType({
  name: 'stackedActivityStreamConnections',
  fields: {
    timeBoxes: {
      description: 'A list of containers by time period e.g A day timebox',
      type: new GraphQLList(timeBoxes)
    },
    unreadMentions: {
      description: 'How many mention events the user has unread',
      type: GraphQLInt
    },
    unreadNotifications: {
      description: 'How many notification events the user has unread',
      type: GraphQLInt
    },
    checkNextPage: {
      description: 'True if content is available in the next page, convenience to inform client to page forward',
      type: GraphQLBoolean
    }
  }
});
