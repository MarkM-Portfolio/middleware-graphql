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

export const deleteStatusUpdateMutationType = {
  type: GraphQLBoolean,
  description: 'type of the mutation for likes',
  args: {
    postId: {
      description: 'id of the post to like',
      name: 'postId',
      type: GraphQLString
    }
  }
};
