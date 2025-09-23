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
import { imageType } from './image';

export const authorType = new GraphQLObjectType({
  name: 'author',
  fields: {
    connections: {
      type: connectionType
    },
    objectType: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
    displayName: {
      type: GraphQLString
    },
    image: {
      type: imageType
    }
  }
});
