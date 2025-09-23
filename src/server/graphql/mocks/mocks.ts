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

import * as casual from 'casual';
import { MockList } from 'graphql-tools';

const mockObj = {
  activityEntry: () => ({ title: casual.title }),
  generator: () => ({ url: casual.url }),
  author: () => ({ displayName: casual.full_name }),
  activitystream: ({ num }) => ({
    list: () => new MockList(num),
    sorted: false
  }),
  opengraph: () => ({
    originalUrl: casual.url,
    provider_url: casual.url,
    url: casual.url,
    thumbnails: () => new MockList(4, () => casual.url)
  }),
  ogvideo: () => ({
    url: casual.url,
    secure_url: casual.url
  })
};

export { mockObj };

// Example fetch for mock data
// {
//   activitystream(num: 4) {
//     sorted,
//     list {
//       id,
//       title,
//       object {
//         id,
//         summary
//       }
//       generator{
//         displayName {
//           id,
//           displayName
//         },
//         url
//       }
//     }
//   }
// }
