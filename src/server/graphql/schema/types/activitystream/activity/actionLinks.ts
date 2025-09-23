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
  GraphQLString
} from 'graphql';

export const actionLinks = new GraphQLObjectType({
  name: 'actionLinks',
  description: 'Provides details of the actionLinks object of the tile',
  fields: {
    caption: {
      type: GraphQLString
    },
    httpVerb: {
      type: GraphQLString
    },
    target: {
      type: GraphQLString
    }
  }
});
