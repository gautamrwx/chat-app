import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';

const profileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    let useRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        useRef = database.ref(`/profiles/${authObj.uid}`);
        useRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();

          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };

          setProfile(data);
          setisLoading(false);
        });
      } else {
        if (useRef) {
          useRef.off();
        }

        setProfile(null);
        setisLoading(false);
      }
    });
    return () => {
      authUnsub();

      if (useRef) {
        useRef.off();
      }
    };
  }, []);

  return (
    <profileContext.Provider value={{ profile, isLoading }}>
      {children}
    </profileContext.Provider>
  );
};

export const useProfile = () => useContext(profileContext);
