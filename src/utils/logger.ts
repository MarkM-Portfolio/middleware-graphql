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

import { loggerFactory } from '@connections/utils-logger';
const LOGGER_ROOT: string = 'middleware-graphql';

export function getLogger(id?: string) {
  const loggerId = typeof id === 'string' ? `${LOGGER_ROOT}/${id}` : LOGGER_ROOT;
  const logConfig = {
    loggerName: loggerId,
    level: process.env.LOG_LEVEL,
    pretty: process.env.LOGGER_PRETTY === 'true'
  };
  return loggerFactory(logConfig);
}
