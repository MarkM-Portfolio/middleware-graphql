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

import { ActivityStreamDataStore } from '@connections/utils-orient-api';
import { LoggerUtils } from '../../../utils';
const TITLE = 'deleteStatusUpdateMutation';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { postId }, context) {
  logger.info(TITLE, 'resolver', context);
  return ActivityStreamDataStore.deleteStatusUpdate(postId, context);
}
