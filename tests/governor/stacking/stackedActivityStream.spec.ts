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

import { wrappedRequest, GRAPHQL_URL } from '../utils';
import { Applications, Areas, Scopes } from '@connections/utils-orient-api';
import { stackedActivityStreamQuery } from '@connections/utils-graphql-queries';
const _ = require('lodash');

describe('Stacking service governor tests for the GraphQL layer', () => {

  const queryDataToPost = {
    operationName: 'stackedActivityStream',
    query: stackedActivityStreamQuery,
    variables: {}
  };

  const queryConfig = {
    url: GRAPHQL_URL,
    json: queryDataToPost,
    form: undefined
  };

  const JASMINE_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  it('verify stackedActivity stream query', (done) => {
    queryDataToPost.variables = {
      scope: Scopes.ME,
      area: Areas.ALL,
      application: Applications.ALL,
      numOfStacks: 10,
      stackSize: 10,
      cursor: 1,
      params: 'undefined'
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      expect(body).not.toBe(undefined);
      expect(body).toEqual(jasmine.any(Object));
      expect(body.data).not.toBe(undefined);
      const stackedActivityStream = body.data.stackedActivityStream;
      expect(stackedActivityStream).not.toBe(undefined);
      expect(stackedActivityStream).toEqual(jasmine.any(Object));
      const timeBoxes = stackedActivityStream.connections.timeBoxes;
      expect(_.isArray(timeBoxes));
      // expect(_.isArray(timeBoxes[0].stacks));
      // expect(timeBoxes[0].stacks[0].totalEventsNum).toBe(timeBoxes[0].stacks[0].events.length);
      // expect(timeBoxes[0].stacks[0].events.length).toBeGreaterThan(0);
      // expect(timeBoxes[0].stacks[0].events.length).toBeLessThan(100);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('verify stackedActivity stream paging', (done) => {
    queryDataToPost.variables = {
      scope: Scopes.ME,
      area: Areas.ALL,
      application: Applications.ALL,
      numOfStacks: 10,
      stackSize: 10,
      cursor: 2,
      params: 'undefined'
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      expect(body).not.toBe(undefined);
      expect(body).toEqual(jasmine.any(Object));
      expect(body.data).not.toBe(undefined);
      const stackedActivityStream = body.data.stackedActivityStream;
      expect(stackedActivityStream).not.toBe(undefined);
      expect(stackedActivityStream).toEqual(jasmine.any(Object));
      const timeBoxes = stackedActivityStream.connections.timeBoxes;
      expect(_.isArray(timeBoxes));
      // expect(_.isArray(timeBoxes[0].stacks));
      // expect(timeBoxes[0].stacks[0].totalEventsNum).toBe(timeBoxes[0].stacks[0].events.length);
      // expect(timeBoxes[0].stacks[0].events.length).toBeGreaterThan(0);
      // expect(timeBoxes[0].stacks[0].events.length).toBeLessThan(100);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

});
