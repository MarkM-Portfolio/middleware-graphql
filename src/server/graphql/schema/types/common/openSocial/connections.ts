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
  GraphQLList
} from 'graphql';
import { videoType } from './video';

export const connectionsType = new GraphQLObjectType({
  name: 'connectionsType',
  description: 'Provides details of the video',
  fields: {
    video: {
      type: new GraphQLList(videoType)
    }
  }
});
