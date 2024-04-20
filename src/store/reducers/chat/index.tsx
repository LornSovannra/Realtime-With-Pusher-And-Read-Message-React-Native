import {ChatTypes} from './../../../constants';

const initialState: any = [
  {
    id: 1,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 2,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 3,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 4,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 5,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 6,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 7,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 8,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 9,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 10,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 11,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 12,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 13,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 14,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 15,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 16,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 17,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 18,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 19,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 20,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 21,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 22,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 23,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 24,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 25,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 26,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 27,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 28,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 29,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 30,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 31,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 32,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 33,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 34,
    title: 'New Notification',
    isReaded: false,
  },
  {
    id: 35,
    title: 'New Notification',
    isReaded: false,
  },
];

export default function businessInfoReducer(state = initialState, action: any) {
  switch (action.type) {
    case ChatTypes.READ_MESSAGE:
      console.log('READ MESSAGE:', action.payload + 1);

      const readMessageId = action.payload + 1;

      const messages = state.map((message: any) => {
        return message.id === readMessageId
          ? {...message, isReaded: true}
          : message;
      });

      return messages;
    default:
      return state;
  }
}
