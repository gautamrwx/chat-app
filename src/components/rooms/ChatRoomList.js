import React from 'react';
import { Nav } from 'rsuite';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomList = ({ aboveElementHeight }) => {
  console.log(aboveElementHeight);
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll"
      style={{
        height: `calc(100% - ${aboveElementHeight}px)`,
      }}
    >
      <ChatRoomItem />
    </Nav>
  );
};

export default ChatRoomList;
