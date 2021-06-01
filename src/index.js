import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'
import { Provider } from 'react-redux';
import store from '../src/store';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA0ZmMfzYD6uVsc4BlsnwzwOhElb12bhK0",
    authDomain: "web-chat-9c7e3.firebaseapp.com",
    projectId: "web-chat-9c7e3",
    storageBucket: "web-chat-9c7e3.appspot.com",
    messagingSenderId: "742400540644",
    appId: "1:742400540644:web:be7303294b42664eced1f1",
    measurementId: "G-VD0Z9905V1"
  };

  firebase.initializeApp(firebaseConfig);

  window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
