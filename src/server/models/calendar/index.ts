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

const CommonModelProps = {
  id: {
    type: 'string',
    description: 'ID of the item'
  },
  subject: {
    type: 'string',
    description: 'Subject of the item'
  },
  url: {
    type: 'string',
    default: '',
    description: 'URL pointing to this item\'s details in the web UI'
  }
};

export const CalendarItem = {
  id: 'CalendarItem',
  type: 'object',
  properties: {
    ...CommonModelProps,
    start: {
      type: 'string',
      description: 'When the event starts'
    },
    end: {
      type: 'string',
      description: 'When the event ends'
    },
    location: {
      type: 'string',
      default: '',
      description: 'Location of the event'
    },
    chair: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      },
      default: {},
      description: 'Organizer of the event'
    },
    myResponse: {
      type: 'string',
      default: '',
      description: 'User\'s response to meeting request'
    },
    isMeeting: {
      type: 'boolean',
      default: false,
      description: 'If true this calendar item represents a meeting, otherwise it represents an appointment'
    },
    isCancelled: {
      type: 'boolean',
      default: false,
      description: 'True if this calendar item has been cancelled'
    },
    isOnlineMeeting: {
      type: 'boolean',
      default: false,
      description: 'True if this calendar item is an online meeting'
    },
    onlineMeetingUrl: {
      type: 'string',
      default: '',
      description: 'URL for joining the online meeting'
    },
   isRecurring: {
      type: 'boolean',
      default: false,
      description: 'True if this calendar item is a recurring instance'
    },
    numConflicting: {
      type: 'number',
      default: 0,
      description: 'Count of meetings conflicting with this one'
    }
  },
  required: [ 'id', 'subject', 'url' ]
};

export const Mail = {
  id: 'Mail',
  type: 'object',
  properties: {
    ...CommonModelProps,
    priority: {
      type: 'string',
      description: 'Priority of the mail'
    },
    isRead: {
      type: 'boolean',
      description: 'Whether the mail has been read or not'
    }
  },
  required: [ 'id', 'subject', 'url' ]
};

export const Task = {
  id: 'Task',
  type: 'object',
  properties: {
    ...CommonModelProps,
    location: {
      type: 'string',
      default: '',
      description: 'Location of the task'
    },
    status: {
      type: 'string',
      description: 'Status of the task'
    },
    startDate: {
      type: 'string',
      description: 'When the task starts'
    },
    dueDate: {
      type: 'string',
      description: 'Due date of the task'
    }
  },
  required: [ 'id', 'subject', 'url', 'status' ]
};
