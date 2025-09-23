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

/*
 * An enumeration of Connections sources that can be used
 * to enforce argument input to a graphql query
 */
import {
  GraphQLEnumType
} from 'graphql';

export const connectionsSourceEnum = new GraphQLEnumType({
  name: 'connectionsSourceEnum',
  values: {
    MICROBLOGGING: {
      description: 'Microblogging application within Connections'
    }
  }
});
