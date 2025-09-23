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

import { Applications } from '@connections/utils-orient-api';

export const applicationEnum = new GraphQLEnumType({
  name: 'applicationEnum',
  values: {
    [Applications.ALL]: {
      description: 'query for all the applications'
    },
    [Applications.COMMUNITIES]: {
      description: 'query to fetch communities activity feed'
    },
    [Applications.FILES]: {
      description: 'query to fetch files activity feed'
    },
    [Applications.BLOGS]: {
      description: 'query to fetch blogs activity feed'
    },
    [Applications.FORUMS]: {
      description: 'query to fetch forums activity feed'
    },
    [Applications.WIKIS]: {
      description: 'query to fetch wikis activity feed'
    },
    [Applications.STATUS]: {
      description: 'query to fetch status updates activity feed'
    },
    [Applications.ACTIVITIES]: {
      description: 'query to fetch activities activity feed'
    }
  }
});
