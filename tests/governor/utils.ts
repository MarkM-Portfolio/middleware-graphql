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


const request = require('request');
import { getLogger } from '../../src/utils/logger';
import { MiddlewareGraphqlRoutes } from '@connections/utils-orient-api';
const logger = getLogger();

const headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36'
};

const _extends = Object.assign || function(target) { for (let i = 1; i < arguments.length; i++) { const source = arguments[i]; for (const key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const HOMEPAGE_URL = process.env.ORIENT_CNX_SCHEME + '://' + process.env.ORIENT_CNX_HOST;

const postConfig = {
  url: HOMEPAGE_URL + '/homepage/j_security_check',
  method: 'POST',
  headers,
  agentOptions: {
    rejectUnauthorized: false
  },
  followRedirect: true,
  form: {
    j_username: 'ajones3',
    j_password: 'jones3'
  },
};

export const GRAPHQL_URL = MiddlewareGraphqlRoutes.getMiddlwareGraphqlURL();

export function wrappedRequest(config): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = request(_extends({}, postConfig, config), (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          response,
          body,
          req
        });
      }
    });
  });
}

export function setCookies(reqHeaders, cookies: string[]) {
  let cookieString = '';
  cookies.forEach((cookie) => {
    cookieString += request.cookie(cookie) + '; ';
  });
  reqHeaders['Cookie'] = cookieString;
}

export function authenticate(done) {
  logger.debug('authenticating...');
  wrappedRequest(postConfig)
  .then((data) => {
    const {response} = data;
    logger.debug('Cookies: ', response.headers['set-cookie']);
    setCookies(headers, response.headers['set-cookie']);
    return wrappedRequest({
      url: HOMEPAGE_URL + '/social/auth/token',
      agentOptions: {
        rejectUnauthorized: false
      },
      method: 'GET',
      headers
    });
  })
  .then((data) => {
    const {response} = data;
    logger.debug('JWT: ', response.headers.authorization);
    headers['authorization'] = response.headers.authorization;
    done();
  })
  .catch((e) => {
    logger.error('Couldn\' authenticate: ', e);
    done();
  });
}
