import React, { useRef, useEffect, useState } from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setheight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setheight(topSidebarRef.current.scrollHeight);
    }
  }, []);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveElementHeight={height} />
    </div>
  );
};

export default Sidebar;
