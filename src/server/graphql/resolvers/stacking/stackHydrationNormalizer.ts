/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import { LoggerUtils } from '../../../../utils';
const TITLE = 'stackHydrationNormalizer';
const logger = LoggerUtils.getLogger(TITLE);
/**
 * Run through the stack looking for an event rollupid not in the cache
 * If one is found promote it to the head of the array (stack) and add
 * this one to the rollupCache
 */
export function handleRollupIdCollision(stack, rollupidCache) {
  if (stack.events.length > 0) {
    const rollupid = stack.events[0].rollupId;
    if (rollupidCache.indexOf(rollupid) >= 0) {
      if (stack.events.length > 1) {
        // duplicate found attempt collision avoidance
        logger.debug('Found a rollupId which is at the head of another stack, move it down the stack', rollupid);
        for (let i = 0; i < stack.events.length; i++) {
          const eventRollupId = stack.events[i].rollupId;
          if (rollupidCache.indexOf(eventRollupId) === -1) {
            // new rollup found move it to the top
            logger.debug('Found a rollupId, not at the head of any other stack, move to head of current stack', JSON.stringify(stack.events));
            const dupeRollupEvent = stack.events[0];
            stack.events[0] = stack.events[i];
            stack.events[i] = dupeRollupEvent;
            logger.debug('Events after reordering...', JSON.stringify(stack.events));

            rollupidCache.push(eventRollupId);
            break;
          }
        }
      } else {
        // just remove the event - its already shown as a top tile.
        // As a single card stack nowhere to hide it.
        logger.silly('rollupid was in cache - a single stack so just remove it ...' + rollupid);
        stack.events.splice(0, 1);
      }
    } else {
      rollupidCache.push(rollupid);
    }
  }
}

/**
 * Iterate events removing the invalid ones - eg ones that could not be
 * retreived from the opensocial hydration
 * event objects
 * @param  stack        The stack object
 */
export function removeInvalidStackEvents(stack) {
  for (let e = stack.events.length - 1; e >= 0; e--) {
    // Check the stack events for duplicate id or invalid data
    const event = stack.events[e];
    const storyId = event.id;
    const isInValidEvent = (typeof event.published === 'undefined'
                          || event.published === null);
    if (isInValidEvent) {
      // Event is a duplicate or invalid remove it
      stack.events.splice(e, 1);
      logger.debug('Found invalid event removing...' + storyId);
    }
  }
}

/**
 * Iterate through all stack events removing
 * - invalid events (bad data)
 * - duplicate storyID's, which are exact event copies in a different stack.
 *
 * For the top event in each stack only, implement rollup collision avoidance.
 * This is where an object is present more than once (e.g wiki page)
 * but has a different event relevant to the stack (e.g two actors commented on
 * the same wiki page and get an entry in each stack)
 * - Detect duplicate rollupID's on the top event in all stacks
 * - If one found iterate in a stack until we find an event rollupid not currently
 * on top of a stack and swap it to the head of the current one. This ensures
 * users will see less duplicated information on their View but retain relevant
 * events within their stacks
 *
 * event objects
 * @param  stack        The stack object
 * @param  storyIdCache A cache of valid existing events
 */
export function validateStackEvents(stack, storyIdCache, rollupidCache) {
  for (let e = stack.events.length - 1; e >= 0; e--) {
    // Check the stack events for duplicate id or invalid data
    const event = stack.events[e];
    const storyId = event.eventId;
    if (storyIdCache.indexOf(storyId) >= 0) {
      // Event is a duplicate or invalid remove it
      stack.events.splice(e, 1);
      logger.debug('Found a duplicate event removing...' + storyId);
    } else {
      // Event is valid and not duplicate - Cache the id for later checking
      storyIdCache.push(storyId);
    }
  }

  handleRollupIdCollision(stack, rollupidCache);
}

/**
 * Helper function to navigate timeboxes / stacks
 * Accept a helper function that will deal with stacks (used to add remove content)
 * At the end validate the arrays to remove stacks / timeboxes
 * which no longer have data in them
 */
function timeboxNavigator(result, visitor) {
  logger.debug('stackHydrationNormalizer', 'timeboxNavigator');
  const timeBoxes = result.timeBoxes;
  try {
    for (let i = timeBoxes.length - 1; i >= 0; i--) {
      // making sure current is not an empty object
      const timebox = timeBoxes[i];
      if (timebox.stacks) {
        for (let s = timebox.stacks.length - 1; s >= 0; s--) {
        // timebox.stacks.forEach((stack, sIndex) => {
          const stack = timebox.stacks[s];
          visitor(stack);
          // Handle a now empty stack
          if (stack.events.length === 0) {
            timebox.stacks.splice(s, 1);
          }
        }
        // Handle a now empty timebox
        if (timebox.stacks.length === 0) {
          timeBoxes.splice(i, 1);
        }
      }
    }
  } catch (e) {
    logger.error('stackHydrationNormalizer', e);
  }
}

/**
 * Navigate the stacks checking and removing invalid events
 */
export function stackHydrationEventValidator(data) {
  logger.debug('stackHydrationNormalizer', 'stackHydrationEventValidator');
  return new Promise((resolve) => {
    timeboxNavigator(data, (stack) => {
      removeInvalidStackEvents(stack);
      resolve(data);
      logger.debug('stackHydrationNormalizer', 'stackHydrationEventValidator');
    });
  });
}

/**
 * Work through timeboxed stacking API, remove duplication
 * and avoid rollupid collision
 */
export function stackHydrationNormalizer(data) {
  logger.debug('stackHydrationNormalizer', 'stackHydrationNormalizer');
  return new Promise((resolve) => {
    const result = data;
    const storyIdCache = [];
    const rollupidCache = [];
    timeboxNavigator(data, (stack) => {
      validateStackEvents(stack, storyIdCache, rollupidCache);
    });
    resolve(result);
    logger.debug('stackHydrationNormalizer', 'stackHydrationNormalizer');
  });
}

/**
 * Work through timeboxed stacking API, remove duplication
 * and avoid rollupid collision
 */
export function stackHydrationValidator(data) {
  logger.debug('stackHydrationValidator', 'stackHydrationValidator');
  return new Promise((resolve) => {
    const result = data;
    timeboxNavigator(result, (stack) => {
      removeInvalidStackEvents(stack);
    });
    logger.debug('stackHydrationValidator', 'stackHydrationValidator');
    resolve(result);
  });
}
