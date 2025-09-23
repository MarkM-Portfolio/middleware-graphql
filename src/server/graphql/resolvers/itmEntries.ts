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

import { ITMDataStore } from '@connections/utils-orient-api';
const TITLE = 'itmEntries';
import { LoggerUtils } from '../../../utils';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { }, context) {
  logger.debug(TITLE, 'resolver', context);
  return ITMDataStore.getITMEntriesInternal(context);
}
