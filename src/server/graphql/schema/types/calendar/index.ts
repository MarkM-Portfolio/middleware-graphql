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
  CalendarItem,
  Mail,
  Task
} from '../../../../models/calendar';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import * as graphQLHelper from '../../../../utils/graphqlHelper';

const CommonQueryFields = {
  count:    { type: GraphQLInt },
  url:      { type: GraphQLString },
  page:     { type: GraphQLInt },
  pageSize: { type: GraphQLInt }
};

const CommonQueryArgs = {
  page:     { type: GraphQLInt },
  pageSize: { type: GraphQLInt }
};

const CalendarItemMyResponseEnum = graphQLHelper.toGraphQLEnumType('CalendarItemMyResponseEnum', [
  'Unknown',
  'NoResponse',
  'Accept',
  'Tentative',
  'Decline'
]);

const MailPriorityEnum = graphQLHelper.toGraphQLEnumType('MailPriorityEnum', [
  'Low',
  'Normal',
  'High'
]);

const TaskStatusEnum = graphQLHelper.toGraphQLEnumType('TaskStatusEnum', [
  'NotStarted',
  'InProgress',
  'Completed',
  'Deferred'
]);

const TaskFilterEnum = graphQLHelper.toGraphQLEnumType('TaskFilterEnum', [
  'Active',
  'Overdue'
]);

const CalendarItemType = graphQLHelper.toGraphQLObjectType('CalendarItemType', CalendarItem, { myResponse: CalendarItemMyResponseEnum });
const MailType = graphQLHelper.toGraphQLObjectType('MailType', Mail, { priority: MailPriorityEnum });
const TaskType = graphQLHelper.toGraphQLObjectType('TaskType', Task, { status: TaskStatusEnum });

const CalendarItemsQueryType = new GraphQLObjectType({
  name: 'calendarItems',
  description: 'Calendar API JSON response type',
  fields: {
    ...CommonQueryFields,
    items: {
      type: new GraphQLList(CalendarItemType)
    }
  }
});

const CalendarItemsQuery = {
  type: CalendarItemsQueryType,
  description: 'Type of GraphQL query for fetching calendar items',
  args: {
    date: {
      type: GraphQLString
    },
    start: {
      type: GraphQLString
    },
    end: {
      type: GraphQLString
    },
    ...CommonQueryArgs
  }
};

const MailQueryType = new GraphQLObjectType({
  name: 'mail',
  description: 'Mail API JSON response type',
  fields: {
    ...CommonQueryFields,
    items: {
      type: new GraphQLList(MailType)
    }
  }
});

const MailQuery = {
  type: MailQueryType,
  description: 'Type of GraphQL query for fetching mail',
  args: {
    priority: {
      type: MailPriorityEnum
    },
    unreadOnly: {
      type: GraphQLBoolean
    },
    ...CommonQueryArgs
  }
};

const TasksQueryType = new GraphQLObjectType({
  name: 'tasks',
  description: 'Tasks API JSON response type',
  fields: {
    ...CommonQueryFields,
    items: {
      type: new GraphQLList(TaskType)
    }
  }
});

const TasksQuery = {
  type: TasksQueryType,
  description: 'Type of GraphQL query for fetching tasks',
  args: {
    filter: {
      type: TaskFilterEnum
    },
    ...CommonQueryArgs
  }
};

export const calendarQueryType = new GraphQLObjectType({
  name: 'calendar',
  description: 'GraphQL schema for the mail service, providing schemas for Calendar, Mail and Tasks APIs',
  fields: {
    calendarItems: CalendarItemsQuery,
    mail: MailQuery,
    tasks: TasksQuery
  }
});
