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
 * An enumeration of Activity areas that can be used
 * to enforce argument input to a graphql query
 */
import {
  GraphQLEnumType
} from 'graphql';

import { Areas } from '@connections/utils-orient-api';

export const areaEnum = new GraphQLEnumType({
  name: 'areaEnum',
  values: {
    [Areas.RESPONSES]: {
      description: 'responses area'
    },
    [Areas.ALL]: {
      description: 'global area'
    },
    [Areas.MENTIONS]: {
      description: 'mentions area'
    },
    [Areas.ACTIONS]: {
      description: 'actions area'
    }
  }
});
