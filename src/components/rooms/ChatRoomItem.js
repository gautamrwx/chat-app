import React from 'react';
import TimeAgo from 'timeago-react';

const ChatRoomItem = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">Room Name</h3>
        <span>
          <TimeAgo datetime={new Date()} locale="en_IN" />
        </span>
      </div>

      <div className="d-flex align-items-center text-black-70">
        <span>No Message Yet !</span>
      </div>
    </div>
  );
};

export default ChatRoomItem;
