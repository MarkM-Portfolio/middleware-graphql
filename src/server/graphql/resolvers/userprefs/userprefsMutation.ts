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

const TITLE = 'userprefsMutation';
import { LoggerUtils } from '../../../../utils';
const logger = LoggerUtils.getLogger(TITLE);
const cachy = require('@connections/cachy-service');
const client = cachy.createClient('userprefs-service');

export default function resolver(root, { applications }, context) {
  logger.debug(TITLE, 'mutation', applications);
  return client.put(context.orgId, [{
    extId: context.userId,
    applications,
    orgId: context.orgId
  }]).then((data) => {
    return client.getByIds(context.orgId, data.ids);
  });
}
