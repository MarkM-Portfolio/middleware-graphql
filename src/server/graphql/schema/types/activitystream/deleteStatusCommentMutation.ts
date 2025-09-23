/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017, 2019                                    */
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

export const deleteStatusCommentMutationType = {
  type: GraphQLBoolean,
  description: 'type of the mutation for comment delete',
  args: {
    commentId: {
      description: 'id of the comment to delete',
      name: 'commentId',
      type: GraphQLString
    },
    postId: {
      description: 'id of the post that contains comment',
      name: 'postId',
      type: GraphQLString
    }
  }
};
