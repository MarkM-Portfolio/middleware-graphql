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

import { validateStackEvents, handleRollupIdCollision } from '../../../src/server/graphql/resolvers/stacking/stackNormalizer';
import stackNormalizer from '../../../src/server/graphql/resolvers/stacking/stackNormalizer';

describe('stackNormalizer resolver functions', () => {
  let stack;
  let stackRollups;
  const eventsNormal: any = [{ events: [{ id: '1234', published: 'date', connections: { rollupid: '1234' } }, { id: '12345', published: 'date', connections: { rollupid: '1234' } }] }];
  const eventsDuplicates: any = [{ events: [{ id: '1234', published: 'date', connections: { rollupid: '1234' } }, { id: '1234', published: 'date', connections: { rollupid: '1234' } }] }];
  const eventsBadData: any = [{ events: [{ id: '1234', connections: { rollupid: '1234' } }, { id: '1234', connections: { rollupid: '1234' } }] }];
  const data: any = {
    connections: {
      timeBoxes: [{
        stacks: eventsNormal
      }]
    }
  };

  beforeEach(() => {
    stack = { events: [{ id: '1234', published: 'date', connections: { rollupid: '1234' } }, { id: '12345', published: 'date', connections: { rollupid: '1234' } }] };
    stackRollups = { events: [{ id: '1234', published: 'date', connections: { rollupid: '1234' } }, { id: '12345', published: 'date', connections: { rollupid: '12345' } }] };
  });

  it('verify base function and object', () => {
    expect(stackNormalizer).not.toBe(null);
    expect(stackNormalizer).toEqual(jasmine.any(Function));
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

  it('should remove a stack entry if one is invalid and does not have published', () => {
    const cache = [];
    delete stack.events[0].published;
    validateStackEvents(stack, cache, []);
    expect(stack.events.length).toEqual(1);
  });

  it('should remove a stack by invalide data and deduplication', () => {
    const cache = ['12345'];
    delete stack.events[0].published;
    validateStackEvents(stack, cache, []);
    expect(stack.events.length).toEqual(0);
  });

  it('timebox: all values remain if no invalid data or duplicates', (done) => {
    stackNormalizer(data).then(() => {
      expect(data.connections.timeBoxes.length).toEqual(1);
      done();
    });
  });

  it('timebox: values are removed when duplicates exist', (done) => {
    stackNormalizer(data).then(() => {
      expect(data.connections.timeBoxes.length).toEqual(1);
      expect(data.connections.timeBoxes[0].stacks[0].events.length).toEqual(2);
      done();
    });
  });

  it('timebox: all values remain if no invalid data or duplicates', (done) => {
    data.connections.timeBoxes[0].stacks = eventsDuplicates;
    stackNormalizer(data).then(() => {
      expect(data.connections.timeBoxes.length).toEqual(1);
      expect(data.connections.timeBoxes[0].stacks[0].events.length).toEqual(1);
      done();
    });
  });

  it('timebox: all values remain if no invalid data or duplicates', (done) => {
    data.connections.timeBoxes[0].stacks = eventsBadData;
    stackNormalizer(data).then(() => {
      expect(data.connections.timeBoxes.length).toEqual(0);
      done();
    });
  });

  it('handleRollupIdCollision: Will preserve stack if all events rollups are in cache', () => {
    const rollupCache = ['1234'];
    handleRollupIdCollision(stack, rollupCache);
    expect(stack.events.length).toEqual(2);
    expect(stack.events[0].id).toEqual('1234');
  });

  it('handleRollupIdCollision: Will correctly detect rollup duplicate and swap', () => {
    const rollupCache = ['1234'];
    handleRollupIdCollision(stackRollups, rollupCache);
    expect(stackRollups.events.length).toEqual(2);
    expect(stackRollups.events[0].id).toEqual('12345');
  });

  it('handleRollupIdCollision: Will preserve stack if there is no event rollups in the cache', () => {
    const rollupCache = [];
    handleRollupIdCollision(stack, rollupCache);
    expect(stack.events.length).toEqual(2);
    expect(stack.events[0].id).toEqual('1234');
  });

  it('handleRollupIdCollision: Will remove a single card stack if the rollupid is found in cache', () => {
    const rollupCache = ['1234'];
    // remove the second element - single card stack with rollupid in our cache
    stack.events.splice(1, 1);
    handleRollupIdCollision(stack, rollupCache);
    expect(stack.events.length).toEqual(0);
  });
});
