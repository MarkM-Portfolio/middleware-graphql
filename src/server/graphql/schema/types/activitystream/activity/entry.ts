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

import { connections } from './connections';
import { generator } from './generator';
import { authorType } from '../../common/openSocial/author';
import { entryType } from '../../common/openSocial/entry';
import { opensocial } from './opensocial';

export const activityEntry = new GraphQLObjectType({
  name: 'activityEntry',
  description: 'A single activity entry within the ActivityStream.',
  fields: {
    actor: {
      type: authorType
    },
    connections: {
      type: connections
    },
    object: {
      type: entryType
    },
    target: {
      type: entryType
    },
    updated: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    generator: {
      type: generator
    },
    id: {
      type: GraphQLString
    },
    url: {
      type: GraphQLString
    },
    verb: {
      type: GraphQLString
    },
    published: {
      type: GraphQLString
    },
    openSocial: {
      type: opensocial
    },
    provider: {
      type: generator
    },
    postedTime: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    }
  }
});
