import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import style from './style';
import {useUnreadMessages} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

type RootStackParamList = {
  Chat: undefined;
  Cart: undefined;
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Chat'>;

const pusher = Pusher.getInstance();

export default function Home() {
  const navigation = useNavigation<any>();
  const unreadMessages = useUnreadMessages();

  const onNavigateToScreen = (screenName: any) => {
    navigation.navigate(screenName);
  };

  async function pusherFunc() {
    await pusher.init({
      apiKey: '4761fbd13adf4075b0da',
      cluster: 'ap1',
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: 'book-store',
      onEvent: (event: PusherEvent) => {
        console.log(`Event received: ${event}`);
      },
    });
  }

  useEffect(() => {
    pusherFunc();
  }, []);

  return (
    <View style={[style.container]}>
      <Text>Home Screen</Text>

      <TouchableOpacity onPress={() => onNavigateToScreen('Chat')}>
        <View style={[style.btnContainer]}>
          <Text style={[style.btnTitle]}>Chat ({unreadMessages.length})</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
