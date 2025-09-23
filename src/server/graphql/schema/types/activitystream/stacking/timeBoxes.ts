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
  GraphQLList
} from 'graphql';

import { stacks } from './stacks';

export const timeBoxes = new GraphQLObjectType({
  name: 'timeBoxes',
  fields: {
    stacks: {
      description: 'A list of stack containers',
      type: new GraphQLList(stacks)
    },
    start: {
      description: 'The timestamp for the start of the timebox for events within the stacks',
      type: GraphQLString
    },
    end: {
      description: 'The timestamp for the end of the timebox for events within the stacks',
      type: GraphQLString
    }
  }
});
