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
import { userprefsQuery, userprefsMutation } from '@connections/utils-graphql-queries';

describe('Userprefs integration tests for the GraphQL layer', () => {

  const JASMINE_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  const customPreference = {
    jitSeen: ['jit-homepage-mypage'],
    whatsNewSeen: ['example'],
    lastGuidedTourTime: '123',
  };
  const applications = {
    orient_me: {
      tour_data: customPreference
    }
  };

  const mutationDataToPost = {
    query: userprefsMutation,
    variables: {
      applications
    }
  };

  const mutationConfig = {
    url: GRAPHQL_URL,
    json: mutationDataToPost,
    form: undefined
  };

  const queryDataToPost = {
    operationName: null,
    query: userprefsQuery,
    variables: {}
  };

  const queryConfig = {
    url: GRAPHQL_URL,
    json: queryDataToPost,
    form: undefined
  };

  it('verify mutation enpoint response data', (done) => {
    wrappedRequest(mutationConfig)
    .then((data) => {
      const { body } = data;
      const userData = body.data.userprefsModify[0];
      expect(userData.applications).toEqual(applications);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('verify query enpoint', (done) => {
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      const userData = body.data.userprefs[0];
      expect(userData.applications).toEqual(applications);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('Use mutation to modify an existing User', (done) => {
    customPreference.whatsNewSeen = ['modified'];
    wrappedRequest(mutationConfig)
    .then((data) => {
      const { body } = data;
      const userData = body.data.userprefsModify[0];
      expect(userData.applications).toEqual(applications);
      return wrappedRequest(queryConfig);
    })
    .then((data) => {
      const { body } = data;
      const userData = body.data.userprefs[0];
      expect(userData.applications).toEqual(applications);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });
});
