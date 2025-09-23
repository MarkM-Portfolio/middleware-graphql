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
  GraphQLInputObjectType,
  GraphQLString
} from 'graphql';

import { imageType } from './inputImageType';
import { attachmentVideoType } from './attachmentVideoType';
import { authorType } from './inputAuthorType';

export const inputAttachmentsType = new GraphQLInputObjectType({
  name: 'inputAttachmentsType',
  fields: {
    author: {
      type: authorType
    },
    displayName: {
      type: GraphQLString
    },
    image: {
      type: imageType
    },
    objectType: {
      type: GraphQLString
    },
    summary: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    connections: {
      type: attachmentVideoType
    },
    published: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    }
  }
});
