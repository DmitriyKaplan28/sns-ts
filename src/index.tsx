import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
    {id: "1", post: "Hi how are you", like: '10 likes'},
    {id: "2", post: "my first post", like: '5 likes'}
]

export let dialogs = [
    {id: "1", name: "Dmitriy"},
    {id: "2", name: "Oksana"},
    {id: "3", name: "Andrey"},
    {id: "4", name: "4"},
    {id: "5", name: "5"},
    {id: "6", name: "6"}
]

export let messages = [
    {id: "1", message: "hi"},
    {id: "2", message: "bye"},
    {id: "3", message: "lol"}
]

ReactDOM.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
