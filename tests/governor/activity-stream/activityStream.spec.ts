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

import { authenticate, wrappedRequest, GRAPHQL_URL } from '../utils';
import { activityStreamQuery } from '@connections/utils-graphql-queries';
import { Applications, Areas, Scopes } from '@connections/utils-orient-api';
const _ = require('lodash');

describe('activity stream governor tests', () => {
  const JASMINE_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;

  beforeAll((done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
    authenticate(done);
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  const queryDataToPost = {
    operationName: null,
    query: activityStreamQuery,
    variables: {}
  };

  const queryConfig = {
    url: GRAPHQL_URL,
    json: queryDataToPost,
    form: undefined
  };

  it('verify activity stream query', (done) => {
    queryDataToPost.variables = {
      count: 20,
      scope: Scopes.ME,
      area: Areas.ALL,
      application: Applications.ALL,
      cursor: 'undefined',
      snapshot: 'undefined',
      filters: 'undefined',
      resetCounter: 'undefined',
      query: ''
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      expect(body).not.toBe(undefined);
      expect(body.data).not.toBe(undefined);
      const activitystream = body.data.activitystream;
      expect(activitystream).not.toBe(undefined);
      expect(activitystream).toEqual(jasmine.any(Object));
      expect(_.isArray(activitystream.list));
      expect(activitystream.itemsPerPage).toBeGreaterThan(0);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('verify activity stream query with 10 entries', (done) => {
    queryDataToPost.variables = {
      count: 10,
      scope: Scopes.ME,
      area: Areas.ALL,
      application: Applications.ALL,
      cursor: 'undefined',
      snapshot: 'undefined',
      filters: 'undefined',
      resetCounter: 'undefined',
      query: ''
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      expect(body).not.toBe(undefined);
      expect(body.data).not.toBe(undefined);
      const activitystream = body.data.activitystream;
      expect(activitystream).not.toBe(undefined);
      expect(activitystream).toEqual(jasmine.any(Object));
      expect(_.isArray(activitystream.list));
      expect(activitystream.itemsPerPage).toBeGreaterThan(0);
      expect(activitystream.itemsPerPage).toBeLessThan(11);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('verify activitystream paging', (done) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    queryDataToPost.variables = {
      count: 10,
      scope: Scopes.ME,
      area: Areas.ALL,
      application: Applications.ALL,
      cursor: date,
      snapshot: 'undefined',
      filters: 'undefined',
      resetCounter: 'undefined',
      query: ''
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      expect(body).not.toBe(undefined);
      expect(body.data).not.toBe(undefined);
      const activitystream = body.data.activitystream;
      expect(activitystream).not.toBe(undefined);
      expect(activitystream).toEqual(jasmine.any(Object));
      expect(_.isArray(activitystream.list));
      // expect(activitystream.itemsPerPage).toBeGreaterThan(0);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });
});
