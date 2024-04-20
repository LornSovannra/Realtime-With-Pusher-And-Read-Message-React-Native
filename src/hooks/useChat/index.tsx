import {useSelector} from 'react-redux';

export default function useChat() {
  const chats = useSelector((state: any) => state.chat);

  return chats;
}
