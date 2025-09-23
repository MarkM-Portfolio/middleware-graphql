/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2018, 2019                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

import resolverObj from '../../../../src/server/graphql/resolvers/deleteStatusCommentMutation';
import { MicroblogDataStore } from '@connections/utils-orient-api';


describe('deleteStatusCommentMutation resolver functions', () => {
  it('verify base function and object', () => {
    expect(resolverObj).not.toBe(null);
    expect(resolverObj).toEqual(jasmine.any(Function));
    let deleteMicroblogCommentSpy = spyOn(MicroblogDataStore, 'deleteMicroblogComment').and.callFake(() => Promise.resolve());
    resolverObj(null, { commentId: 'commentId', postId: 'postId' }, {});
    expect(deleteMicroblogCommentSpy).toHaveBeenCalled();
  });
});