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

import { stackedActivitystream } from './stackedActivitystream';
import {
  GraphQLInt,
  GraphQLString,
} from 'graphql';

import { scopeEnum } from './activity/scopeEnum';
import { areaEnum } from './activity/areaEnum';
import { applicationEnum } from './activity/applicationEnum';

export const stackedActivityStreamQueryType = {
  type: stackedActivitystream,
  description: 'TopUpdates API which provies a stacked and scored ActivityStream. Updates are aggregated by areas you follow (e.g community, actor or content) and priortized based on what is important to you.',
  args: {
    cursor: {
      description: 'Pagination value which is page number starting at 1',
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
    params: {
      type: GraphQLString
    },
    numOfStacks: {
      description: 'Number of stacks on the current page',
      type: GraphQLInt
    },
    stackSize: {
      description: 'Number of ActivityStream events within a stack',
      type: GraphQLInt
    }
  }
};
