import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import style from './style';
import {useDispatch} from 'react-redux';
import {useChat, useUnreadMessages} from '../../hooks';
import {chatActions} from '../../store/actions';

const viewabilityConfig = {
  // minimumViewTime: 250,
  itemVisiblePercentThreshold: 50,
};

export default function Chat() {
  const headersRef = useRef<FlatList>(null);
  const notificationsRef = useRef<FlatList>(null);
  const dispatch = useDispatch<any>();
  const chats = useChat();
  const unreadMessages = useUnreadMessages();

  // console.log('UNREAD MESSAGES', JSON.stringify(unreadMessages));

  const [activeIndex, setActiveIndex] = useState(0);
  const [viewableItems, setViewableItems] = useState([]);
  const [readedMessage, setReadedMessage] = useState<any>([]);

  // console.log('VIEWABLE ITEMS:', viewableItems);

  const keyExtractor = (item: any, index: number) => index.toString();

  const isUnreaded = (item: any) => {
    return unreadMessages.some((message: any) => message.id === item.id);
  };

  const lastIndexrReadedMessage = () => {
    if (unreadMessages.length === 0) return 0;

    const firstUnreadMessage = unreadMessages[0];

    const firstIndexUnreadMessage = chats.findIndex(
      (message: any) => message.id === firstUnreadMessage.id,
    );

    // return firstIndexUnreadMessage - 1;
    return firstIndexUnreadMessage;
  };

  console.log('LAST INDEX OF READED MESSAGE:', lastIndexrReadedMessage());

  const scrollToNotificationItem = (index: number) => {
    notificationsRef.current?.scrollToIndex({index: index, viewPosition: 1});
  };

  useEffect(() => {
    scrollToNotificationItem(lastIndexrReadedMessage());
  }, []);

  // useMemo(() => {
  //   console.log('READED INDEX:', readedMessage);
  // }, [readedMessage]);

  const addMessageToReadedList = (index: number) => {
    const isAdded = readedMessage.some((item: any) => item === index);

    if (!isAdded) {
      setReadedMessage((prev: any) => [...prev, index]);

      dispatch(chatActions.readMessage(index));
    }
  };

  const onViewableItemsChanged = ({viewableItems}: {viewableItems: any}) => {
    const visibleItems = viewableItems.map((item: any) => item.index);

    setViewableItems(visibleItems);
  };

  const visibleItems = useMemo(() => {
    return viewableItems;
  }, [viewableItems]);

  const notificationItem = ({item, index}: {item: any; index: number}) => {
    const isInView = visibleItems.some((item: any) => item === index);

    isInView && addMessageToReadedList(index);
    // isInView && setActiveIndex(index);
    // isInView &&
    //   headersRef.current?.scrollToIndex({
    //     index: index,
    //     viewPosition: 0.5,
    //   });

    return (
      <View
        style={[
          style.container,
          // {backgroundColor: isInView ? 'green' : 'red'},
          {backgroundColor: isUnreaded(item) ? 'red' : 'green'},
        ]}>
        <Text style={[style.title, {color: 'white'}]}>INDEX: {index}</Text>
      </View>
    );
  };

  const ItemSeperator = () => {
    return <View style={{height: 15}} />;
  };

  const ItemSeperatorHorizontal = () => {
    return <View style={{width: 15}} />;
  };

  const headerItem = ({item, index}: {item: any; index: any}) => {
    return (
      <TouchableOpacity onPress={() => scrollToNotificationItem(index)}>
        <View
          style={[
            style.headerContainer,
            {backgroundColor: activeIndex === index ? 'green' : 'red'},
          ]}>
          <Text style={[style.headerTitle]}>{index}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const customHeader = () => {
    return (
      <View>
        <FlatList
          ref={headersRef}
          horizontal
          data={chats}
          renderItem={headerItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={{paddingHorizontal: 15}}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeperatorHorizontal}
        />
      </View>
    );
  };

  // UI KIT
  return (
    <SafeAreaView style={{gap: 15}}>
      <View style={{marginTop: 5}} />

      {customHeader()}

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
        }}>
        <Text>Unreaded ({unreadMessages.length})</Text>
      </View>

      <FlatList
        ref={notificationsRef}
        data={chats}
        inverted={false}
        renderItem={notificationItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ItemSeparatorComponent={ItemSeperator}
        keyExtractor={keyExtractor}
        initialScrollIndex={activeIndex}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            notificationsRef.current?.scrollToIndex({index: info.index});
          });
        }}
      />
    </SafeAreaView>
  );
}
