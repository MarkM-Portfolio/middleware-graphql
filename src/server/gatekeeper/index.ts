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

import gatekeeper, { GKUIutils } from '@connections/utils-gatekeeper';
import * as path from 'path';

const gkFile = 'gkValues.json';

// config here
gatekeeper.init({
  versionedFlagsPath: path.resolve(__dirname, gkFile)
});

export default gatekeeper;
export { GKUIutils as gkUIutils };
