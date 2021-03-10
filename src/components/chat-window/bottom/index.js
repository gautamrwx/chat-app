import React, { useCallback, useState } from 'react';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const ChatBottom = () => {
  const [input, setinput] = useState('');
  const [isLoading, setisLoading] = useState(false);

  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = useCallback(val => {
    setinput(val);
  }, []);

  const onSendClick = async () => {
    if (!input || input.trim() === '') {
      return;
    }

    setisLoading(true);
    const messageData = assembleMessage(profile, chatId);
    messageData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = messageData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...messageData,
      msgId: messageId,
    };

    try {
      await database.ref().update(updates);
      setinput('');
      setisLoading(false);
    } catch (err) {
      Alert.error(err.message);
      setisLoading(false);
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write Message Here..."
          value={input}
          onChange={onInputChange}
          disabled={isLoading}
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
