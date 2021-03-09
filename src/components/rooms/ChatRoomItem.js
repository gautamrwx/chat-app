/* eslint-disable no-unused-vars */
import React from 'react';
import TimeAgo from 'timeago-react';

const ChatRoomItem = ({ room }) => {
  const { name, createdAt, description } = room;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <span>
          <TimeAgo datetime={new Date(createdAt)} locale="en_IN" />
        </span>
      </div>

      <div className="d-flex align-items-center text-black-70">
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ChatRoomItem;
