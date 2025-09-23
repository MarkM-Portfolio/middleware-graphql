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
  GraphQLString, GraphQLInt
} from 'graphql';

// import { connectionsSourceEnum } from '../common/enums/connectionsSourceEnum';
import { entryType } from './commentsQueryEntry';

export const contentType = {
  type: entryType,
  description: 'type of the graphql query to fetch the comments of a specific post',
  args: {
    userId: {
      name: 'userId',
      description: 'id of the user that created the status update',
      type: GraphQLString
    },
    postId: {
      name: 'postId',
      description: 'id of the post to comment',
      type: GraphQLString
    },
    // source: {
    //   name: 'source',
    //   description: 'The backend service for the comment query',
    //   type: connectionsSourceEnum
    // },
    page: {
      name: 'page',
      description: 'Page requested',
      type: GraphQLInt
    },
    count: {
      name: 'count',
      description: 'Number of results requested',
      type: GraphQLInt
    }
  }
};
