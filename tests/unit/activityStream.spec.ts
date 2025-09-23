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

import resolverObj from '../../src/server/graphql/resolvers/activityStream';
import stackedResolverObj from '../../src/server/graphql/resolvers/stacking/stackedActivityStream';

describe('activityStream resolver functions', () => {
  it('verify base function and object', () => {
    expect(resolverObj).not.toBe(null);
    expect(resolverObj).toEqual(jasmine.any(Function));
  });

  it('verify base function and object of the stacked resolver', () => {
    expect(stackedResolverObj).not.toBe(null);
    expect(stackedResolverObj).toEqual(jasmine.any(Function));
  });
});
