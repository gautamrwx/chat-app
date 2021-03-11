import React, { useCallback, useState } from 'react';
import firebase from 'firebase/app';
import { useParams } from 'react-router';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';
import AudioMessageBtn from './AudioMessageBtn';

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
    likeCount: 0,
  };
}

const ChatBottom = () => {
  const [input, setinput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = useCallback(val => {
    setinput(val);
  }, []);

  const onSendClick = async () => {
    if (!input || input.trim() === '') {
      return;
    }

    setIsLoading(true);
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
      setIsLoading(false);
    } catch (err) {
      Alert.error(err.message);
      setIsLoading(false);
    }
  };

  const afterUpload = useCallback(
    async files => {
      setIsLoading(true);

      const updates = {};

      files.forEach(file => {
        const msgData = assembleMessage(profile, chatId);
        msgData.file = file;

        const messageId = database.ref('messages').push().key;

        updates[`/messages/${messageId}`] = msgData;
      });

      const lastMsgId = Object.keys(updates).pop();

      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId: lastMsgId,
      };

      try {
        await database.ref().update(updates);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        Alert.error(err.message);
      }
    },
    [chatId, profile]
  );

  return (
    <div>
      <InputGroup>
        <AttachmentBtnModal afterUpload={afterUpload} />
        <AudioMessageBtn afterUpload={afterUpload} />
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
