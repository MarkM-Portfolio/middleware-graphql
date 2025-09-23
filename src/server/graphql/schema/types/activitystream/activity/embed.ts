/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017, 2019                                    */
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

import { context } from './context';

export const embed = new GraphQLObjectType({
  name: 'embed',
  description: 'Provides details of the embedded object of the tile',
  fields: {
    context: {
      type: context
    },
    gadget: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    }
  }
});
