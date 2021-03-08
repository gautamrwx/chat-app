import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBF9XnRRBJIAPx7TrcGrEAI3W8RL_Isy8E',
  authDomain: 'chat-web-app-ac1dc.firebaseapp.com',
  databaseURL: 'https://chat-web-app-ac1dc-default-rtdb.firebaseio.com',
  projectId: 'chat-web-app-ac1dc',
  storageBucket: 'chat-web-app-ac1dc.appspot.com',
  messagingSenderId: '144563113151',
  appId: '1:144563113151:web:e291b15e79be0b182f4a0a',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
