/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2017, 2019                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { ActivityStreamDataStore, ActivityStreamRoutes } from '@connections/utils-orient-api';
import stackHydrator from './stackHydrator';
import stackNormalizer from './stackNormalizer';
import gatekeeperModule from '../../../gatekeeper';
const TITLE = 'stackedActivityStream';
import { LoggerUtils } from '../../../../utils';
const logger = LoggerUtils.getLogger(TITLE);

/**
 * Validate and pad numOfStacks by one for paging
 */
function getNumStacks(numOfStacks) {
  let numberStacksPlusOne = numOfStacks;
  if (isNaN(numberStacksPlusOne)) {
    numberStacksPlusOne = 10;
  }
  return numberStacksPlusOne;
}

function generateURL(variables, context, isHydrationActive): string {
  const { params, cursor, stackSize, numOfStacks, scope, area, application, paramsString } = variables;
  let url;
  if (isHydrationActive) {
    url = ActivityStreamRoutes.generateOrientRetrievalDNSUrl(params, context.userId, cursor, stackSize, getNumStacks(numOfStacks));
  } else {
    url = ActivityStreamRoutes.generateAbsoluteStackedActivityStreamURL(scope, area, application, paramsString, context.isOauth);
  }
  // Uncomment to hit icekubes directly over k8s discovery url
  // const url = `http://icekubes.swg.usma.ibm.com:31602/api/v1/retrieval/stacks?page=${cursor}&stackSize=${stackSize}&numOfStacks=${getNumStacks(numOfStacks)}&userId=${context.userId}`;
  logger.debug(TITLE, 'stackedActivityStream', url);
  return url;
}

function validateStacks(variables, isHydrationActive: boolean, context, retries = 2): Promise<any> {
  const url = generateURL(variables, context, isHydrationActive);
  return ActivityStreamDataStore.getActivityStream(url, undefined).then((data) => {
    let validationPromise = null;
    if (isHydrationActive) {
      validationPromise = stackHydrator(data, context, variables.numOfStacks);
    }
    if (gatekeeperModule.get('stacking-api-normalizer', context.userId)) {
      validationPromise = stackNormalizer(data);
    }
    if (validationPromise) {
      return validationPromise
        .then((validatedData) => {
          const timeBoxes = validatedData.connections.timeBoxes;
          // if we have an empty timeBoxes array we try to page the events 3 times
          if (timeBoxes && timeBoxes.length === 0 && retries !== 0) {
            retries--;
            return validateStacks(Object.assign({}, variables, { cursor: (variables.cursor || 1) + 1 }),
              isHydrationActive,
              context,
              retries);
          }
          return validatedData;
        });
    }
    return data;
  });
}

export default function resolver(root, { scope, area, application, cursor, params, numOfStacks, stackSize }, context) {
  logger.debug(TITLE, 'stackedActivityStream', 'resolver' + JSON.stringify({ scope, area, application, cursor, params, numOfStacks, stackSize }));

  const paramsString = params !== 'undefined' ? params : undefined;
  // Support a mocking override on the stacked tiles.
  if (context.mockResolvers) {
    // fallback to mock API resolution
    return new Promise((resolve) => {
      const stackedMockJson = require('@connections/orient-mock-data').stackedMockJson;
      logger.debug(TITLE, 'stackedActivityStream', stackedMockJson);
      resolve(stackedMockJson);
    });
  }

  // Replace with new timebox api in pink
  const variables = { scope, area, application, cursor, params, numOfStacks, stackSize, paramsString };
  return validateStacks(variables, true, context);
}
