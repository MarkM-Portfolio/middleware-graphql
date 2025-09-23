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
import { opengraphQuery } from '@connections/utils-graphql-queries';

describe('opengraph governor tests', () => {

  const JASMINE_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  const queryDataToPost = {
    operationName: 'opengraph',
    query: opengraphQuery,
    variables: {}
  };

  const queryConfig = {
    url: GRAPHQL_URL,
    json: queryDataToPost,
    form: undefined
  };

  it('verify opengraph query', (done) => {
    queryDataToPost.variables = {
      url: 'www.ibm.com',
      maxHeight: 800,
      maxWidth: 600,
      extended: false
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      const opengraphData = body.data.opengraph;
      expect(opengraphData).not.toBe(undefined);
      expect(opengraphData).toEqual(jasmine.any(Object));
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });
});
