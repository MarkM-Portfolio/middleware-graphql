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
  GraphQLList
} from 'graphql';
import { image } from './image';
import { metadata } from './metadata';

export const itmEntries = new GraphQLObjectType({
  name: 'itmEntries',
  fields: {
    id: {
      type: GraphQLString
    },
    image: {
      type: image
    },
    metadata: {
      type: metadata
    },
    name: {
      type: GraphQLString
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    type: {
      type: GraphQLString
    }
  }
});
