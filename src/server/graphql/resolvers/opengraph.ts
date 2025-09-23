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
import { opengraph as normalizer } from '../normalizers/normalizers';
const TITLE = 'opengraph';
import { LoggerUtils } from '../../../utils';
const logger = LoggerUtils.getLogger(TITLE);

export default function resolver(root, { url, maxHeight, maxWidth, extended }, context) {
  logger.debug(TITLE, 'resolver', context);
  return MicroblogDataStore.getOpenGraphData(url, maxHeight, maxWidth, extended, context).then(normalizer);
}
