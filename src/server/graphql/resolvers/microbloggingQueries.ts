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

import { MicroblogDataStore } from '@connections/utils-orient-api';
const TITLE = 'microbloggingQueries';
import { LoggerUtils } from '../../../utils';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { userId, postId, page, count }, context) {
  logger.debug(TITLE, 'resolver', { userId, postId, page, count });
  const promise = MicroblogDataStore.getMicroblogComments(userId, postId, context, page, count);
  logger.debug(TITLE, 'resolve', promise);
  return promise;
}
