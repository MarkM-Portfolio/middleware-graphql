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
import * as _ from 'lodash';
import { stackHydrationValidator, stackHydrationNormalizer } from './stackHydrationNormalizer';
import { LoggerUtils } from '../../../../utils';
const TITLE = 'stackHydrator';
const logger = LoggerUtils.getLogger(TITLE);
/**
 * Iterates through the timebox api and visits each event
 * allowing caller to provide a function to process the event
 */
export function stackEventNavigator(result, visitor) {
  const timeboxes = (result.connections) ? result.connections.timeBoxes
                                         : result.timeBoxes;
  try {
    timeboxes.forEach((timebox) => {
      timebox.stacks.forEach((stack) => {
        stack.events.forEach((event) => {
          visitor(event);
        });
      });
    });
  } catch (e) {
    logger.error('stackEventNavigator', e);
  }
}

/**
 * Call through the timeboxes and extract the event id's within
 */
export function stackEventIdExtractor(result) {
  const storyIdArray = [];
  stackEventNavigator(result, (event) => {
    storyIdArray.push(event.eventId);
  });
  return storyIdArray;
}

/**
 * Visit the stacks and check if we have one more than page size (numOfStacks)
 * NumOfStacks is padded by one to all client ascertain if another fetch is
 * required
 */
export function hasNextPage(result, numOfStacks) {
  const timeboxes = (result.connections) ? result.connections.timeBoxes
                                         : result.timeBoxes;
  let total = 0;
  let nextPage = false;
  try {
    nextPage = timeboxes.some((timebox) => {
      if (timebox.stacks) {
        return timebox.stacks.some((stack, index) => {
          total++;
          // if we have all the stacks requested it means it could be some space for pagination
          if (total === numOfStacks) {
            logger.silly('hasNextPage; found a match for next page');
            return true;
          }
        });
      }
    });
  } catch (e) {
    logger.error('hasNextPage', e);
  }
  return nextPage;
}

export function getIdFromUrn(input) {
  let output = input;
  if (input) {
    const index = input.lastIndexOf(':');
    if (index !== -1) {
      output = input.substring(index + 1, input.length);
    }
  }
  return output;
}

/**
 * Run through the standard Activitystream and create a
 * map based on activity event id key.
 */
export function processActivityStream(result) {
  const activityMap = {};
  result.list.forEach((activity) => {
    const idWithoutURN = getIdFromUrn(activity.id);
    activityMap[idWithoutURN] = activity;
  });
  return activityMap;
}

export function mergeActivityEvent(unhydratedEvent, eventMap) {
  const matchedEvent = eventMap[unhydratedEvent.eventId];
  if (matchedEvent) {
    logger.debug('Found a matched event, merging..' + unhydratedEvent.id);
    _.merge(unhydratedEvent, matchedEvent);
  }
}

/**
 * Activitystream when requetsing one item will be a single entry
 * if more than one will be a list with array. Convert the single
 * entry to list
 */
function convertSingleEntryToList(stream) {
  let streamList = stream;
  if (stream.entry) {
    streamList = {
      list: [stream.entry]
    };
  }
  return streamList;
}

/**
 * Take a connections object from Activity Stream (hydration) feed and put the contents
 * into the timebox api - specifically for returning unread badge values
 * Merge in checkNextPage - if we fetched one more stack than in numOfStacks
 */
export function mergeConnectionsDataToTimeboxAPI(timeboxApi, streamData, nextPage) {
  if (streamData.connections) {
    streamData.connections.checkNextPage = nextPage;
    _.merge(timeboxApi.connections, streamData.connections);
  }
}

/**
 * Extract event ids from timebox API - fetch activitystream data
 * and insert it back into the timebox API envelope to complete
 * hydration for the API
 */
const stackHydrator = (data, context, numOfStacks) => {
  logger.debug('stackHydrator', 'stackHydrator', context);
  logger.debug('timebox data returned ' + JSON.stringify(data));
  const nextPage = (data && hasNextPage(data, numOfStacks));
  return new Promise((resolve) => {
    // check for next page before we normalize data object
    stackHydrationNormalizer(data).then((normalizedData) => {
      logger.silly('Normalized the timebox api data', normalizedData);
      let connectionsEnvelope;
      if (typeof data.connections === 'undefined') {
        connectionsEnvelope = {
          connections: normalizedData
        };
      }
      const storyIdArray = stackEventIdExtractor(normalizedData);
      if (storyIdArray && storyIdArray.length > 0) {
        const streamAPIUrl = ActivityStreamRoutes.getActivityStreamByStoryIds(storyIdArray, context.isOauth);
        logger.debug('Fetching stream data: ' + streamAPIUrl);
        ActivityStreamDataStore.fetchActivityStream(streamAPIUrl, {}, context).then((streamData) => {
          const streamList = convertSingleEntryToList(streamData);
          const activityMapById = processActivityStream(streamList);
          logger.silly('Fetched Activitystream for hydration IDs', activityMapById);
          stackEventNavigator(normalizedData, (event) => {
            mergeActivityEvent(event, activityMapById);
          });
          stackHydrationValidator(normalizedData).then((validatedData) => {
            connectionsEnvelope.connections = validatedData;
            mergeConnectionsDataToTimeboxAPI(connectionsEnvelope, streamData, nextPage);
            logger.debug('stackHydrator ', 'Timeboxes hydrated: ', connectionsEnvelope);
            resolve(connectionsEnvelope);
          }).catch((err) => {
            logger.error('Hydration failed with err ', err);
          });
        }).catch((err) => {
          resolve(connectionsEnvelope);
        });
      } else {
        logger.debug('stackHydrator ', 'No timeboxes returned: ', connectionsEnvelope);
        resolve(connectionsEnvelope);
      }
    });
  });
};

export default stackHydrator;
