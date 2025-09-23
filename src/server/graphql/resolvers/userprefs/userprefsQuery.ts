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

const TITLE = 'userprefsQuery';
import { LoggerUtils } from '../../../../utils';
const logger = LoggerUtils.getLogger(TITLE);
const cachy = require('@connections/cachy-service');
const client = cachy.createClient('userprefs-service');

export default function resolver(root, { }, context) {
  logger.debug(TITLE, 'query', {
    orgId: context.orgId,
    extId: context.userId
  });
  return client.getList(context.orgId, {
    extId: context.userId,
    modelToQuery: 'User'
  }).then((data) => {
    return client.getByIds(context.orgId, data.ids);
  })
  .catch((e) => {
    logger.error(TITLE, e);
    return new Promise((resolve) => {
      resolve(null);
    });
  });
}
