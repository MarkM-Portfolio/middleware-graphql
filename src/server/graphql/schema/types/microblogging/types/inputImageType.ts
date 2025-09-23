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

export const imageType = new GraphQLInputObjectType({
  name: 'inputImage',
  description: 'Provides details of the image',
  fields: {
    url: {
      type: GraphQLString
    },
    alt: {
      type: GraphQLString
    }
  }
});
