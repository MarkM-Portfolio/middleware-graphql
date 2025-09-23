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
import { microblogging as normalize } from '../normalizers/normalizers';
const TITLE = 'microbloggingMutations';
import { LoggerUtils } from '../../../utils';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { content, userId, postId, inputAttachments, isLike }, context) {
  logger.debug(TITLE, 'resolver', { userId, content, postId, inputAttachments, isLike });
  if (!content) {
    return isLike ? MicroblogDataStore.postMicroblogLike(userId, postId, context) : MicroblogDataStore.postMicroblogUnlike(userId, postId, context);
  }

  //  if the userId parameter is not present, we know that is a status update because we don't need it.
  return (userId) ? MicroblogDataStore.postMicroblogComment(content, userId, postId, context) :
    MicroblogDataStore.postMicroblogStatusUpdate(content, context, inputAttachments).then(normalize);
}
