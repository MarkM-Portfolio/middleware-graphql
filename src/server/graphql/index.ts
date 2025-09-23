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

export { getSchema } from './schema/OrientGraphQLSchema';
export { mockObj } from './mocks/mocks';
import activitystream from './resolvers/activityStream';
import stackedActivityStream from './resolvers/stacking/stackedActivityStream';
import opengraph from './resolvers/opengraph';
import microbloggingMutations from './resolvers/microbloggingMutations';
import microbloggingQueries from './resolvers/microbloggingQueries';
import deleteStatusUpdateMutation from './resolvers/deleteStatusUpdateMutation';
import deleteStatusCommentMutation from './resolvers/deleteStatusCommentMutation';
import activityStreamMutations from './resolvers/activityStreamMutations';
import itmEntries from './resolvers/itmEntries';
import calendar from './resolvers/calendar';
import userprefsQuery from './resolvers/userprefs/userprefsQuery';
import userprefsMutation from './resolvers/userprefs/userprefsMutation';

const resolverObj = {
  orientQueryType: {
    microbloggingQueries,
    activitystream,
    stackedActivityStream,
    opengraph,
    itmEntries,
    calendar,
    userprefs: userprefsQuery
  },
  statusMutationType: {
    entry: microbloggingMutations,
    like: microbloggingMutations,
    unlike: microbloggingMutations,
    deleteStatusUpdate: deleteStatusUpdateMutation,
    repost: activityStreamMutations,
    userprefsModify: userprefsMutation,
    deleteStatusUpdateComment: deleteStatusCommentMutation
  }
};

export { resolverObj };
