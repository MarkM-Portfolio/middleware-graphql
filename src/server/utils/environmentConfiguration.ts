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

import { icConfig } from '@connections/utils-ic-config';

export function configure() {
  const cnxHost = process.env.ORIENT_CNX_HOST;
  const cnxPort = process.env.ORIENT_CNX_PORT || 80;
  const cnxScheme = process.env.ORIENT_CNX_SCHEME || 'http';
  const cnxInterHost = process.env.ORIENT_CNX_INTERSERVICE_HOST;
  const cnxInterPort = process.env.ORIENT_CNX_INTERSERVICE_PORT;
  const cnxInterScheme = process.env.ORIENT_CNX_INTERSERVICE_SCHEME;
  const cnxInterOpengraphPort = process.env.CNX_INTERSERVICE_OPENGRAPH_PORT;
  const DEPLOYMENT_TYPE = process.env.DEPLOYMENT_TYPE || 'HYBRID_CLOUD';
  icConfig.setDeploymentFromConfig(cnxHost, cnxPort, cnxScheme, cnxInterHost, cnxInterPort, cnxInterScheme, cnxInterOpengraphPort);
  icConfig.setDeploymentType(DEPLOYMENT_TYPE);
  // ref utils-auth requirements for JWT
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'this_is_the_real_secret';
  process.env.ENCRYPT_PASSWORD = process.env.ENCRYPT_PASSWORD || 'this_is_the_real_secret';
  process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info'; // used in auth
  process.env.JWT_EXPIRES_IN_MINUTES = process.env.JWT_EXPIRES_IN_MINUTES || '60';
  process.env.JWT_NAME = process.env.JWT_NAME || 'cnx_token';
  process.env.CONNECTIONS_AUTH_TOKEN_NAME = process.env.CONNECTIONS_AUTH_TOKEN_NAME || 'LtpaToken2';
  process.env.CONNECTIONS_URL = process.env.CONNECTIONS_URL || '';
  process.env.CONNECTIONS_HOMEPAGE_URL = process.env.CONNECTIONS_HOMEPAGE_URL || icConfig.getDeploymentUrl() + '/homepage';

  // temp when in production cloud and config env vars not present
  if (process.env.CONNECTIONS_URL === '' && icConfig.isConnectionsDeployment()) {
    process.env.CONNECTIONS_URL = icConfig.getDeploymentUrl() + '/connections';
    process.env.CONNECTIONS_HOMEPAGE_URL = icConfig.getExternalDeploymentUrl() + '/homepage';
    const profileUrl = icConfig.DEPLOYMENTS.CNX_INTER_SERVICE.SCHEME + icConfig.DEPLOYMENTS.CNX_INTER_SERVICE.HOST + ':9093/profiles';
    process.env.CONNECTIONS_PROFILES_URL = profileUrl;
  }
}
