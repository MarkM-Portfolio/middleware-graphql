/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018, 2019                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { MicroblogDataStore } from '@connections/utils-orient-api';
import { LoggerUtils } from '../../../utils';
const TITLE = 'deleteStatusCommentMutation';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { commentId, postId }, context) {
  logger.info(TITLE, 'resolver', context);
  return MicroblogDataStore.deleteMicroblogComment(commentId, postId, context);
}
