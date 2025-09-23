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

import calendarResolver from '../../../../src/server/graphql/resolvers/calendar';
import { CalendarDataStore } from '@connections/utils-orient-api';
import { icUtils } from '@connections/utils-auth-web';
import rewire = require('rewire');

const rootObj = {};
const argsObj = {};
const contextObj = { headers: { authorization: 'Negotiate abcd' } };
const rootResolver = calendarResolver(rootObj, argsObj, contextObj);
const contextObjNoAuth = { headers: { } };
const bearerHeader = 'Bearer abcd';
const rewiredCalendarResolver = rewire('../../../../src/server/graphql/resolvers/calendar');
const addJWT = rewiredCalendarResolver.__get__('addJWT');
const CUSTOM_AUTH_HEADER = rewiredCalendarResolver.__get__('CUSTOM_AUTH_HEADER');

describe('Calendar resolver obj', () => {
  let getCalendarItemsInternalSpy;
  let getMailInternalSpy;
  let getTasksInternalSpy;
  beforeEach(() => {
    getCalendarItemsInternalSpy = spyOn(CalendarDataStore, 'getCalendarItemsInternal').and.callFake(() => Promise.resolve());
    getMailInternalSpy          = spyOn(CalendarDataStore, 'getMailInternal').and.callFake(() => Promise.resolve());
    getTasksInternalSpy         = spyOn(CalendarDataStore, 'getTasksInternal').and.callFake(() => Promise.resolve());
    spyOn(icUtils, 'getJWTBearerHeader').and.returnValue(bearerHeader);
  });
  describe('Calendar Item resolver', () => {
    let promise;
    beforeEach(() => {
      promise = rootResolver.calendarItems(argsObj, contextObj);
    });
    it('should return a Promise', () => {
      expect(promise).toEqual(jasmine.any(Promise));
    });
    it('should call getCalendarItemsInternal from CalendarDataStore', () => {
      expect(getCalendarItemsInternalSpy).toHaveBeenCalledWith(addJWT(contextObj), argsObj);
    });
  });
  describe('Mail resolver', () => {
    let promise;
    beforeEach(() => {
      promise = rootResolver.mail(argsObj, contextObj);
    });
    it('should return a Promise', () => {
      expect(promise).toEqual(jasmine.any(Promise));
    });
    it('should call getMailInternal from CalendarDataStore', () => {
      expect(getMailInternalSpy).toHaveBeenCalledWith(addJWT(contextObj), argsObj);
    });
  });
  describe('Task resolver', () => {
    let promise;
    beforeEach(() => {
      promise = rootResolver.tasks(argsObj, contextObj);
    });
    it('should return a Promise', () => {
      expect(promise).toEqual(jasmine.any(Promise));
    });
    it('should call getTask from CalendarDatStore', () => {
      expect(getTasksInternalSpy).toHaveBeenCalledWith(addJWT(contextObj), argsObj);
    });
  });
  describe('addJWT()', () => {
    describe('If Authorization header has been set in context object', () => {
      it('should add JWT in custom auth header', () => {
        const contextObjWithJWT = addJWT(contextObj);
        expect(contextObjWithJWT.headers[CUSTOM_AUTH_HEADER]).toBe(bearerHeader);
      });
    });
    describe('If Authorization header has not been set in context object', () => {
      it('should return context object unmodified', () => {
        const contextObjWithoutJWT = addJWT(contextObjNoAuth);
        expect(contextObjWithoutJWT.headers[CUSTOM_AUTH_HEADER]).toBeUndefined();
      });
    });
  });
});
