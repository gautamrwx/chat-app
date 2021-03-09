import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader, Nav } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import ChatRoomItem from './ChatRoomItem';

const ChatRoomList = ({ aboveElementHeight }) => {
  const rooms = useRooms();
  const location = useLocation();

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll"
      style={{
        height: `calc(100% - ${aboveElementHeight + 20}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="loading" size="md" speed="slow" />
      )}

      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            to={`/chats/${room.id}`}
            key={room.id}
            eventKey={`/chats/${room.id}`}
          >
            <ChatRoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default ChatRoomList;
