import {useSelector} from 'react-redux';

export default function useUnreadMessages() {
  const messages = useSelector((state: any) => state.chat);

  const unreadMessages = messages.filter(
    (message: any) => message.isReaded === false,
  );

  return unreadMessages;
}
