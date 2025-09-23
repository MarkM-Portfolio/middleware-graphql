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

import { ActivityStreamDataStore, ActivityStreamRoutes } from '@connections/utils-orient-api';
import { activityStream as activityStreamFilter } from '../normalizers/normalizers';
const TITLE = 'activityStream';
import { LoggerUtils } from '../../../utils';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { count, scope, area, application, cursor, snapshot, filters, resetCounter, query }, context) {
  logger.debug(TITLE, 'activitystream', context);
  let url = ActivityStreamRoutes.getApplicationOpenSocialUrl(scope, area, application, true, context.isOauth);
  url += (!filters || filters === 'undefined') && cursor && cursor !== 'undefined' ? '&updatedBefore=' + cursor : '';
  url += snapshot && snapshot !== 'undefined' ? '&snapshot=' + snapshot : '';
  if (filters && filters !== 'undefined') {
    url += filters;
    url += cursor && cursor !== 'undefined' ? '&dateFilter=' + JSON.stringify({ to: cursor }) : '';
  }
  if (query) {
    url += '&query=' + query;
  }
  if (resetCounter && resetCounter !== 'undefined') {
    url += '&resetCounter=' + resetCounter;
  }
  return ActivityStreamDataStore.getActivityStream(url, count, context).then(activityStreamFilter);
}
