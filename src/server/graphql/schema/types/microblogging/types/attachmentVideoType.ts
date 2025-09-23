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
  GraphQLInputObjectType
} from 'graphql';
import { attachmentVideoInfoType } from './attachmentVideoInfoType';

export const attachmentVideoType = new GraphQLInputObjectType({
  name: 'attachmentVideoType',
  description: 'Provides details of the video',
  fields: {
    video: {
      type: attachmentVideoInfoType
    }
  }
});
