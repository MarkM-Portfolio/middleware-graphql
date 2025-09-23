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
  GraphQLSchema,
} from 'graphql';

import { contentType } from './types/microblogging/microblogMutationType';
import { contentType as commentQueryType } from './types/comments/commentsQueryType';
import { stackedActivityStreamQueryType } from './types/activitystream/stackedActityStreamQueryType';
import { itmEntries } from './types/itm/itmEntries';
import { calendarQueryType } from './types/calendar';
import { likeMutationType } from './types/microblogging/likeMutationType';
import { unlikeMutationType } from './types/microblogging/unlikeMutationType';
import { deleteStatusUpdateMutationType } from './types/activitystream/deleteStatusUpdateMutation';
import { deleteStatusCommentMutationType } from './types/activitystream/deleteStatusCommentMutation';
import { repostMutationType } from './types/activitystream/repostMutationType';
import { activityStreamQueryType } from './types/activitystream/activityStreamQueryType';
import { opengraphQueryType } from './types/opengraph/opengraphQueryType';
import { buildGraphqlSchema } from '../../utils/graphqlLoopbackUtils';
const cachy = require('@connections/cachy-service');
const sPClient = cachy.createClient('userprefs-schema-service');
const MIDDLEWARE_GRAPHQL_SERVICE_ORGID = 'middleware_graphql_service';
/**
 * [GraphQLObjectType: type of the mutations for commments and status updates since the types are compatible]
 */
const statusMutationType = {
  name: 'statusMutationType',
  fields: {
    entry: contentType,
    like: likeMutationType,
    unlike: unlikeMutationType,
    deleteStatusUpdate: deleteStatusUpdateMutationType,
    deleteStatusUpdateComment: deleteStatusCommentMutationType,
    repost: repostMutationType,
  }
};
/**
 * [GraphQLObjectType: type of the graphql query to fetch the comments of a specific post]
 */
const OrientQueryType = {
  name: 'orientQueryType',
  description: 'GraphQL schema for the Orient project, providing a schema to cover social APIs including OpenSocial ActivityStreams, Microblogging and the new TopUpdates API for stacking and prioritization of Activity Updates.',
  fields: {
    microbloggingQueries: commentQueryType,
    activitystream: activityStreamQueryType,
    stackedActivityStream: stackedActivityStreamQueryType,
    opengraph: opengraphQueryType,
    calendar: {
      type: calendarQueryType
    },
    itmEntries: {
      type: itmEntries
    }
  }
};

export function getSchema(): Promise<GraphQLSchema> {
  return sPClient.getList(MIDDLEWARE_GRAPHQL_SERVICE_ORGID, {})
  .then((data) => {
    return sPClient.getByIds(MIDDLEWARE_GRAPHQL_SERVICE_ORGID, data.ids);
  })
  .then((schemas: any[]): Promise<GraphQLSchema> => {
    return new Promise((resolve, reject) => {
      resolve(buildGraphqlSchema(schemas[0], OrientQueryType, statusMutationType));
    });
  });
}
