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

import { validateStackEvents, handleRollupIdCollision } from '../../../src/server/graphql/resolvers/stacking/stackHydrationNormalizer';
import { stackHydrationNormalizer, stackHydrationValidator } from '../../../src/server/graphql/resolvers/stacking/stackHydrationNormalizer';

describe('stackHydrationNormalizer resolver functions', () => {
  let stack;
  let stackRollups;
  const eventsNormal: any = [{ events: [{ eventId: '1234', rollupId: '1234' }, { eventId: '12345', rollupId: '1234' }] }];
  const eventsDuplicates: any = [{ events: [{ eventId: '1234', rollupId: '1234' }, { eventId: '1234', rollupId: '1234' }] }];
  const eventsBadData: any = [{ events: [{ eventId: '1234', rollupId: '1234' }, { eventId: '1234', rollupId: '1234' }] }];
  const data: any = {
    timeBoxes: [{
      stacks: eventsNormal
    }]
  };

  beforeEach(() => {
    stack = { events: [{ eventId: '1234', rollupId: '1234' }, { eventId: '12345', rollupId: '1234' }] };
    stackRollups = { events: [{ eventId: '1234', rollupId: '1234' }, { eventId: '12345', rollupId: '12345' }] };
  });

  it('verify base function and object', () => {
    expect(stackHydrationNormalizer).not.toBe(null);
    expect(stackHydrationNormalizer).toEqual(jasmine.any(Function));
    expect(stackHydrationValidator).not.toBe(null);
    expect(stackHydrationValidator).toEqual(jasmine.any(Function));
    expect(validateStackEvents).not.toBe(null);
    expect(validateStackEvents).toEqual(jasmine.any(Function));
  });

  it('should return all values in the stack if all valid', () => {
    const cache = [];
    validateStackEvents(stack, cache, []);
    expect(stack.events.length).toEqual(2);
  });

  it('should remove a stack event when one already exists in the cache', () => {
    const cache = ['1234'];
    validateStackEvents(stack, cache, []);
    expect(stack.events.length).toEqual(1);
  });

  it('timebox: all values remain if no invalid data or duplicates', (done) => {
    stackHydrationNormalizer(data).then(() => {
      expect(data.timeBoxes.length).toEqual(1);
      done();
    });
  });

  it('timebox: values are removed when duplicates exist', (done) => {
    stackHydrationNormalizer(data).then(() => {
      expect(data.timeBoxes.length).toEqual(1);
      expect(data.timeBoxes[0].stacks[0].events.length).toEqual(2);
      done();
    });
  });

  it('timebox: all values remain if no invalid data or duplicates', (done) => {
    data.timeBoxes[0].stacks = eventsDuplicates;
    stackHydrationNormalizer(data).then(() => {
      expect(data.timeBoxes.length).toEqual(1);
      expect(data.timeBoxes[0].stacks[0].events.length).toEqual(1);
      done();
    });
  });

  it('timebox: all values remain if no invalid data or duplicates with bad data', (done) => {
    data.timeBoxes[0].stacks = eventsBadData;
    stackHydrationValidator(data).then(() => {
      expect(data.timeBoxes.length).toEqual(0);
      done();
    });
  });

  it('handleRollupIdCollision: Will preserve stack if all events rollups are in cache', () => {
    const rollupCache = ['1234'];
    handleRollupIdCollision(stack, rollupCache);
    expect(stack.events.length).toEqual(2);
    expect(stack.events[0].eventId).toEqual('1234');
  });

  it('handleRollupIdCollision: Will correctly detect rollup duplicate and swap', () => {
    const rollupCache = ['1234'];
    handleRollupIdCollision(stackRollups, rollupCache);
    expect(stackRollups.events.length).toEqual(2);
    expect(stackRollups.events[0].eventId).toEqual('12345');
  });

  it('handleRollupIdCollision: Will preserve stack if there is no event rollups in the cache', () => {
    const rollupCache = [];
    handleRollupIdCollision(stack, rollupCache);
    expect(stack.events.length).toEqual(2);
    expect(stack.events[0].eventId).toEqual('1234');
  });

  it('handleRollupIdCollision: Will remove a single card stack if the rollupid is found in cache', () => {
    const rollupCache = ['1234'];
    // remove the second element - single card stack with rollupid in our cache
    stack.events.splice(1, 1);
    console.log('stack splice ' + JSON.stringify(stack.events));
    handleRollupIdCollision(stack, rollupCache);
    expect(stack.events.length).toEqual(0);
  });
});
