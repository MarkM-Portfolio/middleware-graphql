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

import { authorType } from './author';

export const itemType = new GraphQLObjectType({
  name: 'item',
  fields: {
    author: {
      type: authorType
    },
    content: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
    objectType: {
      type: GraphQLString
    },
    updated: {
      type: GraphQLString
    }
  }
});
