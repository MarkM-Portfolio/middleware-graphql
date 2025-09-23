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
  GraphQLList,
  GraphQLString
} from 'graphql';
import { video } from './video';

export const opengraph = new GraphQLObjectType({
  name: 'opengraph',
  description: 'The OpenGraph (UrlPreview) Schema',
  fields: {
    description: {
      type: GraphQLString
    },
    originalUrl: {
      type: GraphQLString
    },
    provider_url: {
      type: GraphQLString
    },
    thumbnails: {
      type: new GraphQLList(GraphQLString)
    },
    title: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    version: {
      type: GraphQLString
    },
    video: {
      type: new GraphQLList(video)
    }
  }
});
