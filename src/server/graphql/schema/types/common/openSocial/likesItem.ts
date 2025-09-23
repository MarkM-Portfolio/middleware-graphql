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

import { connectionType } from './connection';

export const likesItemType = new GraphQLObjectType({
  name: 'likesItem',
  fields: {
    connections: {
      type: connectionType
    },
    id: {
      type: GraphQLString
    },
    objectType: {
      type: GraphQLString
    },
    displayName: {
      type: GraphQLString
    }
  }
});
