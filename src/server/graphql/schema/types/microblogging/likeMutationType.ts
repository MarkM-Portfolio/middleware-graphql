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
  GraphQLBoolean
} from 'graphql';

import { entryType } from '../common/openSocial/entry';

export const likeMutationType = {
  type: entryType,
  description: 'type of the mutation for likes',
  args: {
    userId: {
      description: 'id of the user that likes the status update',
      name: 'userId',
      type: GraphQLString
    },
    postId: {
      description: 'id of the post to like',
      name: 'postId',
      type: GraphQLString
    },
    isLike: {
      description: 'boolean value that describes whenever is a like or an unlike action',
      name: 'isLike',
      type: GraphQLBoolean
    }
  }
};
