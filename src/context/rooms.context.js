import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helper';

const RoomsContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setrooms] = useState(null);

  useEffect(() => {
    const roomListner = database.ref('rooms');

    roomListner.on('value', snap => {
      const data = transformToArrWithId(snap.val());
      setrooms(data);
    });

    return () => {
      roomListner.off();
    };
  }, []);
  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
