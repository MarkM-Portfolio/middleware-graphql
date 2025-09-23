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
  GraphQLList
} from 'graphql';

import { connectionType } from './connection';
import { repliesType } from './replies';
import { likesType } from './likes';
import { authorType } from './author';
import { attachmentType } from './attachment';
import { imageType } from './image';

export const entryType = new GraphQLObjectType({
  name: 'entry',
  description: 'type of the Microblog JSON object we\'ll find in the response',
  fields: {
    connections: {
      type: connectionType
    },
    summary: {
      type: GraphQLString
    },
    replies: {
      type: repliesType
    },
    content: {
      type: GraphQLString
    },
    displayName: {
      type: GraphQLString
    },
    objectType: {
      type: GraphQLString
    },
    author: {
      type: authorType
    },
    updated: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
    likes: {
      type: likesType
    },
    published: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    image: {
      type: imageType
    },
    mimeType: {
      type: GraphQLString
    },
    fileUrl: {
      type: GraphQLString
    },
    fileSize: {
      type: GraphQLInt
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    attachments: {
      type: new GraphQLList(attachmentType)
    }
  }
});
