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
  GraphQLList,
  GraphQLFloat
} from 'graphql';

import { activityEntry } from '../activity/entry';

export const stacks = new GraphQLObjectType({
  name: 'stacks',
  fields: {
    events: {
      description: 'A list of all the ActivityStream events within the stack',
      type: new GraphQLList(activityEntry)
    },
    stackType: {
      description: 'A string which denotes the stack indentifier - the thing you follow, for which the events in the stack are related.',
      type: GraphQLString
    },
    stackName: {
      description: 'A display name for the stack which is the main followed item on which the stack events are based',
      type: GraphQLString
    },
    stackId: {
      description: 'The ID of the stackType - e.g community, actor or content ID',
      type: GraphQLString
    },
    stackScore: {
      description: 'Relevance score attributed to the stack based on how important it is to the viewer',
      type: GraphQLFloat
    },
    totalEventsNum: {
      type: GraphQLInt
    }
  }
});
