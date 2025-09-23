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

import stackHydrator, { stackEventNavigator, hasNextPage, processActivityStream, stackEventIdExtractor, mergeConnectionsDataToTimeboxAPI, mergeActivityEvent, getIdFromUrn } from '../../../../src/server/graphql/resolvers/stacking/stackHydrator';
import { ActivityStreamDataStore } from '@connections/utils-orient-api';
import * as Q from 'q';

describe('stackingHydrator util and functions', () => {
  const eventsStack: any = [{ events: [{ id: '1234', eventId: '1234', published: 'date', connections: { rollupid: '1234' } }, { id: '12345', eventId: '12345', published: 'date', connections: { rollupid: '1234' } }] }];
  const eventsStackPaging: any = [{ events: [{ eventId: '1234', published: 'date', connections: { rollupid: '1234' } }, { eventId: '12345', published: 'date', connections: { rollupid: '1234' } }] },
                            { events: [{ eventId: '1234', published: 'date', connections: { rollupid: '1234' } }, { eventId: '12345', published: 'date', connections: { rollupid: '1234' } }] },
                            { events: [{ eventId: '1234', published: 'date', connections: { rollupid: '1234' } }, { eventId: '12345', published: 'date', connections: { rollupid: '1234' } }] },
                            { events: [{ eventId: '1234', published: 'date', connections: { rollupid: '1234' } }, { eventId: '12345', published: 'date', connections: { rollupid: '1234' } }] }];

  const eventsNormal: any = [{ id: '1234', published: 'date', connections: { rollupid: '1234' } }, { id: '12345', published: 'date', connections: { rollupid: '1234' } }];
  const eventsUnhydrated: any = [{ events: [{ eventId: '1234' }, { eventId: '12345' }] }];
  const data: any = {
    connections: {
      timeBoxes: [{
        stacks: eventsStack
      }]
    }
  };

  const dataUnhydrated = {
    timeBoxes: [{
      stacks: eventsUnhydrated
    }]
  };

  it('verify base function and object', () => {
    expect(stackEventNavigator).not.toBe(null);
    expect(stackEventNavigator).toEqual(jasmine.any(Function));
  });

  it('processActivityStream convert activitystream to simple object keyed by id', () => {
    const tester = {
      list: eventsNormal
    };
    const streamMapById = processActivityStream(tester);
    expect(streamMapById['1234']).not.toBeNull();
    expect(streamMapById['12345']).not.toBeNull();
    expect(streamMapById['123456']).toBeUndefined();
    expect(streamMapById['1234'].published).toEqual('date');
  });

  it('stackEventNavigator will iterate events and accept basic visitor function', () => {
    let tester = 0;
    stackEventNavigator(data, () => {
      tester ++;
    });
    expect(tester).toEqual(2);
  });

  it('stackEventIdExtractor returns the event ids from all timebox stacks', () => {
    const idArray = stackEventIdExtractor(data);
    expect(idArray).not.toBeNull();
    expect(idArray[0]).toEqual('1234');
    expect(idArray[1]).toEqual('12345');
  });

  it('mergeActivityEvent correctly merges a full actitiystream event into timebox stack placeholder', () => {
    const unhydratedEvent: any = { eventId: '1234' };
    const activityMap = {};
    activityMap[eventsNormal[0].id] = eventsNormal[0];
    mergeActivityEvent(unhydratedEvent, activityMap);
    expect(unhydratedEvent.id).toEqual('1234');
    expect(unhydratedEvent.published).toEqual('date');
    expect(unhydratedEvent.connections.rollupid).toEqual('1234');
  });

  it('getIdFromUrn correctly extracts an activitystream id from a urn', () => {
    const test = 'urn:lsid:lconn.ibm.com:wikis.story:aeb3fbc1-5c48-4121-b098-49c77a553954';
    expect(getIdFromUrn(test)).toEqual('aeb3fbc1-5c48-4121-b098-49c77a553954');
  });

  it('getIdFromUrn correctly extracts an activitystream id even if not a urn', () => {
    const test = 'aeb3fbc1-5c48-4121-b098-49c77a553954';
    expect(getIdFromUrn(test)).toEqual('aeb3fbc1-5c48-4121-b098-49c77a553954');
  });

  it('mergeConnectionsDataToTimeboxAPI merges in one connections object to the other', () => {
    const timeboxApi: any = {
      connections: ['test', 'test1']
    };

    const streamData: any = {
      connections: {
        unreadMentions: 2,
        unreadNotifications: 3
      }
    };
    mergeConnectionsDataToTimeboxAPI(timeboxApi, streamData, undefined);
    expect(timeboxApi.connections.unreadMentions).toEqual(2);
    expect(timeboxApi.connections.unreadNotifications).toEqual(3);
  });

  it('stackHydrator: correctly returns whether there is a nextPage to fetch', () => {
    data.connections.timeBoxes[0].stacks = eventsStackPaging.slice(0);
    expect(hasNextPage(data, 1)).toBeTruthy();
    data.connections.timeBoxes[0].stacks = eventsStackPaging.slice(0);
    expect(hasNextPage(data, 2)).toBeTruthy();
    data.connections.timeBoxes[0].stacks = eventsStackPaging.slice(0);
    expect(hasNextPage(data, 3)).toBeTruthy();
    data.connections.timeBoxes[0].stacks = eventsStackPaging.slice(0);
    expect(hasNextPage(data, 4)).toBeTruthy();
    data.connections.timeBoxes[0].stacks = eventsStackPaging.slice(0);
    expect(hasNextPage(data, 5)).not.toBeTruthy();
    data.connections.timeBoxes[0].stacks = eventsStack;
  });

  it('stackHydrator: process the timebox api - fetchs stories and hydrates', (done) => {
    const deferred = Q.defer();
    spyOn(ActivityStreamDataStore, 'fetchActivityStream').and.returnValue(deferred.promise);
    const streamHydration = {
      list: eventsNormal
    };
    deferred.resolve(streamHydration);
    stackHydrator(dataUnhydrated, { isOauth: true }, undefined).then((result) => {
      expect(result).not.toBeNull();
      expect(result).toEqual(data);
      done();
    }, (error) => {
      fail('Should not err on handleAuthentication' + error);
      done();
    });
  });
});
