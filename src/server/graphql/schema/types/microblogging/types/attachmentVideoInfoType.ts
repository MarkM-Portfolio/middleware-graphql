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
import { attachmentVideoMimetype } from './attachmentVideoMimetype';

export const attachmentVideoInfoType = new GraphQLInputObjectType({
  name: 'attachmentVideoInfoType',
  description: 'Provides details of the video',
  fields: {
    connections: {
      type: attachmentVideoMimetype
    },
    height: {
      type: GraphQLString
    },
    secureUrl: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    width: {
      type: GraphQLString
    }
  }
});
