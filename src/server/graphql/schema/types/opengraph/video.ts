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
  GraphQLString,
  GraphQLInt
} from 'graphql';

export const video = new GraphQLObjectType({
  name: 'ogvideo',
  description: 'A video object within opengraph',
  fields: {
    video: {
      type: GraphQLString
    },
    height: {
      type: GraphQLInt
    },
    secure_url: {
      type: GraphQLString
    },
    tag: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    width: {
      type: GraphQLInt
    }
  }
});
