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

const opengraph = (data) => {
  return new Promise((resolve) => {
    const result = data;
    if (data.video) {
      data.video.forEach((current, i) => {
        if (typeof current.video === 'string') {
          result.video[i] = {
            video: current.video,
            height: current['video:height'],
            secure_url: current['video:secure_url'],
            tag: current['video:tag'],
            type: current['video:type'],
            url: current['video:url'],
            width: current['video:width']
          };
        }
      });
    }
    resolve(result);
  });
};

const activityStream = (data) => {
  return new Promise((resolve) => {
    const result = data;
    result.list.forEach((current) => {
      // making sure current is not an empty object
      if (current.object && current.object.attachments) {
        current.object.attachments.forEach((attachment) => {
          if (attachment.connections && attachment.connections.video) {
            attachment.connections.video.forEach((video) => {
              video.connections.mimetype = video.connections['mime-type'];
            });
          }
        });
      }
    });
    resolve(result);
  });
};

const microblogging = (data) => {
  return new Promise((resolve) => {
    const result = data;
    if (result.attachments) {
      result.attachments.forEach((current) => {
        // making sure current is not an empty object
        if (current.connections && current.connections.video) {
          current.connections.video.forEach((video) => {
            video.connections = {
              'mime-type': video.connections.mimetype
            };
          });
        }
      });
    }
    resolve(result);
  });
};

export {
  opengraph,
  activityStream,
  microblogging
};
