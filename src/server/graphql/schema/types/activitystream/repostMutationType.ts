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
  GraphQLString
} from 'graphql';

import { entryType } from '../common/openSocial/entry';

export const repostMutationType = {
  type: entryType,
  description: 'type of the mutation for the repost action',
  args: {
    id: {
      description: 'id of the status update to repost',
      name: 'id',
      type: GraphQLString
    }
  }
};
