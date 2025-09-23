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

const root = require('../../src/server/boot/root');

export default () => {
  describe('root loobpack boot validation', () => {
    it('verify base function and object', () => {
      expect(root).not.toBe(null);
      expect(root).toEqual(jasmine.any(Function));
    });

    it('verify base function and object', () => {
      const loopback = require('loopback');
      const app = module.exports = loopback();
      root(app);
    });
  });
};
