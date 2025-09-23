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

export const telephone = new GraphQLObjectType({
  name: 'telephone',
  fields: {
    fax: {
      type: GraphQLString
    },
    mobile: {
      type: GraphQLString
    },
    work: {
      type: GraphQLString
    }
  }
});
