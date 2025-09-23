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
import { commentQuery, commentMutation, statusMutation, likeMutation, unlikeMutation } from '@connections/utils-graphql-queries';
const _ = require('lodash');

describe('Microblogging governor tests', () => {

  const JASMINE_TIMEOUT = jasmine.DEFAULT_TIMEOUT_INTERVAL;

  const queryDataToPost = {
    operationName: null,
    query: commentQuery,
    variables: {}
  };

  const queryConfig = {
    url: GRAPHQL_URL,
    json: queryDataToPost,
    form: undefined
  };

  const mutationDataToPost = {
    query: commentMutation,
    variables: null
  };

  const mutationConfig = {
    url: GRAPHQL_URL,
    json: mutationDataToPost,
    form: undefined
  };

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  afterAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = JASMINE_TIMEOUT;
  });

  let userId;
  let postId;

  it('Verify post a status update mutation', (done) => {

    const attachment = {
      author: {
        id: '8c266840-f6df-1032-9a76-d02a14283ea9'
      },
      displayName: 'EmoticonHappy.gif',
      id: 'b2cee288-659a-4857-844e-61852fdfe29d',
      image: {
        url: '{files}/form/anonymous/api/library/0673c887-e16c-4a6b-aa75-734e8cfb1366/document/b2cee288-659a-4857-844e-61852fdfe29d/thumbnail?renditionKind=largeview'
      },
        objectType: 'file',
        published: '2017-09-22T13:08:06.571Z',
        summary: '',
        url: '{files}/form/anonymous/api/library/0673c887-e16c-4a6b-aa75-734e8cfb1366/document/b2cee288-659a-4857-844e-61852fdfe29d/media/EmoticonHappy.gif'
      };

    mutationDataToPost.query = statusMutation;
    mutationDataToPost.variables = {
      content: 'test content',
      attachments: [attachment]
    };
    wrappedRequest(mutationConfig)
    .then((data) => {
      const { body } = data;
      const entry = body.data.entry;
      expect(entry).not.toBe(undefined);
      expect(entry).toEqual(jasmine.any(Object));
      expect(entry.content).toBe('test content');
      userId = entry.author.id;
      postId = entry.id;
      expect(userId).toEqual(jasmine.any(String));
      expect(postId).toEqual(jasmine.any(String));
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('Verify post a comment mutation', (done) => {
    mutationDataToPost.variables = {
      content: 'test comment',
      userId,
      postId
    };
    mutationDataToPost.query = commentMutation;
    wrappedRequest(mutationConfig)
    .then((data) => {
      const { body } = data;
      const entry = body.data.entry;
      expect(entry).not.toBe(undefined);
      expect(entry).toEqual(jasmine.any(Object));
      expect(entry.content).toBe('test comment');
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('Verify get comments query', (done) => {
    queryDataToPost.variables = {
      userId,
      postId,
      page: 0,
      count: 5
    };
    wrappedRequest(queryConfig)
    .then((data) => {
      const { body } = data;
      expect(body).toEqual(jasmine.any(Object));
      expect(body.data).toEqual(jasmine.any(Object));
      const microbloggingQueries = body.data.microbloggingQueries;
      expect(microbloggingQueries).toEqual(jasmine.any(Object));
      expect(_.isArray(microbloggingQueries.list));
      expect(microbloggingQueries.list[0].content).toBe('test comment');
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('Verify like mutation', (done) => {
    mutationDataToPost.query = likeMutation;
    mutationDataToPost.variables = {
        userId,
        postId,
        isLike: true
      };
    wrappedRequest(mutationConfig)
    .then((data) => {
      const { body } = data;
      expect(body).toEqual(jasmine.any(Object));
      expect(body.data).toEqual(jasmine.any(Object));
      const like = body.data.like;
      expect(like).toEqual(jasmine.any(Object));
      expect(like.objectType).toBe('like');
      expect(like.id).toEqual(jasmine.any(String));
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });

  it('Verify delete like mutation', (done) => {
    mutationDataToPost.query = unlikeMutation;
    mutationDataToPost.variables = {
      userId,
      postId,
      isLike: false
    };
    wrappedRequest(mutationConfig)
    .then((data) => {
      const { body } = data;
      const unlike = body.data.unlike;
      expect(unlike).not.toBe(undefined);
      expect(unlike).toBe(true);
      done();
    })
    .catch((e) => {
      expect(e).toBe(null);
      done();
    });
  });
});
