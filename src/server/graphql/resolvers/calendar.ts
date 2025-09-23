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

import { icUtils } from '@connections/utils-auth-web';
import { CalendarDataStore } from '@connections/utils-orient-api';

const CUSTOM_AUTH_HEADER = process.env.CUSTOM_AUTH_HEADER || 'X-cnx-auth';

/**
 * Puts JWT into specified custom auth header
 * if Authorization header has already been set,
 * otherwise returns the context object unchanged.
 */
function addJWT(context, headerName = CUSTOM_AUTH_HEADER) {
  if (context.headers && context.headers.authorization) {
    context.headers[headerName] = icUtils.getJWTBearerHeader();
  }
  return context;
}

export function calendarItems(args, context) {
  return CalendarDataStore.getCalendarItemsInternal(context, args);
}

export function mail(args, context) {
  return CalendarDataStore.getMailInternal(context, args);
}

export function tasks(args, context) {
  return CalendarDataStore.getTasksInternal(context, args);
}

export default (root, args, context) => {
  addJWT(context);
  return {
    calendarItems,
    mail,
    tasks
  };
};
