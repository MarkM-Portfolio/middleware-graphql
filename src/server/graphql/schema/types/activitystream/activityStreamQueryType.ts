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

import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { activitystream } from './activitystream';
import { scopeEnum } from './activity/scopeEnum';
import { areaEnum } from './activity/areaEnum';
import { applicationEnum } from './activity/applicationEnum';

export const activityStreamQueryType = {
  description: 'Core Schema for Connections OpenSocial ActivityStream API',
  type: activitystream,
  args: {
    count: {
      description: 'Number of ActivityStream events to retrieve in the page',
      type: GraphQLInt
    },
    scope: {
      description: 'Specifying that user (@me in the URLs below, IBM Connections does not generally allow retrieval of other users streams)',
      type: scopeEnum
    },
    area: {
      description: 'Specifying the group in question (@all in the URLs below, IBM Connections does not generally allow filtering by groups except in the case of status updates)',
      type: areaEnum
    },
    application: {
      description: 'Specifying the application. Each application can be described by the appropriate id. In the case of 3rd Parties, this will be the generator id that was submitted with the event. @all can be used if a single stream of events from all applications is desired.',
      type: applicationEnum
    },
    cursor: {
      description: 'Pagination value which for ActivityStream is updatedBefore date val',
      type: GraphQLString
    },
    snapshot: {
      type: GraphQLString
    },
    filters: {
      description: 'Exposure of ActivityStream Search filters -> &filters=[{\'type\':\'actor\',\'values\':[\'id1\',\'id2\']}, {\'type\':\'community\',\'values\':[\'c1\']}]',
      type: GraphQLString
    },
    resetCounter: {
      type: GraphQLString
    },
    query: {
      description: 'Exposure of ActivityStream Search filters -> &query=\'string\'',
      type: GraphQLString
    }
  }
};
