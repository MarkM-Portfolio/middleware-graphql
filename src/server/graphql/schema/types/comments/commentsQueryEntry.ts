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
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import { entryType as entry } from '../common/openSocial/entry';

export const entryType = new GraphQLObjectType({
  name: 'queryEntry',
  fields: {
    startIndex: {
      type: GraphQLInt
    },
    totalResults: {
      type: GraphQLInt
    },
    filtered: {
      type: GraphQLBoolean
    },
    itemsPerPage: {
      type: GraphQLInt
    },
    sorted: {
      type: GraphQLBoolean
    },
    list: {
      type: new GraphQLList(entry)
    },
    updatedSince: {
      type: GraphQLBoolean
    }
  }
});
