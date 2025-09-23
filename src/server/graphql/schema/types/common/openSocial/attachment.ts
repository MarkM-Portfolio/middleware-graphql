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
import { imageType } from './image';
import { connectionsType } from './connections';

export const attachmentType = new GraphQLObjectType({
  name: 'attachment',
  fields: {
    image: {
      type: imageType
    },
    summary: {
      type: GraphQLString
    },
    author: {
      type: authorType
    },
    id: {
      type: GraphQLString
    },
    displayName: {
      type: GraphQLString
    },
    published: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    objectType: {
      type: GraphQLString
    },
    connections: {
      type: connectionsType
    }
  }
});
