/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { opengraph } from './opengraph';
import {
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql';

export const opengraphQueryType = {
  type: opengraph,
  description: 'Opengraph API supporting retrieval of OpenGraph metadata on a web page URL. Used in Url Preview feature',
  args: {
    url: {
      type: GraphQLString
    },
    maxHeight: {
      type: GraphQLInt
    },
    maxWidth: {
      type: GraphQLInt
    },
    extended: {
      type: GraphQLBoolean
    }
  }
};
