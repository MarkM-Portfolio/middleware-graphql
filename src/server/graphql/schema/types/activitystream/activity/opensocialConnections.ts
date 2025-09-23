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

import { generator } from './generator';

export const connections = new GraphQLObjectType({
  name: 'connections',
  description: 'Provides details of the opensocial connections object',
  fields: {
    generator: {
      type: generator
    },
    rollupUrl: {
      type: GraphQLString
    }
  }
});
