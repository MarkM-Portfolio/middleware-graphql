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
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} from 'graphql';
import {
  inputAttachmentsType
} from './types/attachmentsType';

import { entryType } from '../common/openSocial/entry';

export const contentType = {
  type: entryType,
  description: 'type of the mutations for commments and status updates since the types are compatible',
  args: {
    content: {
      name: 'content',
      description: 'content of the message',
      type: new GraphQLNonNull(GraphQLString)
    },
    inputAttachments: {
      name: 'inputAttachments',
      description: 'url preview information for the message',
      type: new GraphQLList(inputAttachmentsType)
    },
    userId: {
      description: 'id of the user that created the status update',
      name: 'userId',
      type: GraphQLString
    },
    postId: {
      description: 'id of the post to comment',
      name: 'postId',
      type: GraphQLString
    }
  }
};
