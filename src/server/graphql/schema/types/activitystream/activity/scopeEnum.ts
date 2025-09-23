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
 * An enumeration of Activity scopes that can be used
 * to enforce argument input to a graphql query
 */
import {
  GraphQLEnumType
} from 'graphql';

import { Scopes } from '@connections/utils-orient-api';

export const scopeEnum = new GraphQLEnumType({
  name: 'scopeEnum',
  values: {
    [Scopes.ME]: {
      description: 'pesonal scope'
    },
    [Scopes.PUBLIC]: {
      description: 'public scope'
    },
    [Scopes.ALL]: {
      description: 'generic scope'
    }
  }
});
