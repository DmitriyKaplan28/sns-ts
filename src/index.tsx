import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App, {StateType} from './App';
import {BrowserRouter} from "react-router-dom";

let reRenderEntireTree = () => {
    ReactDOM.render(
            <BrowserRouter>
                <App state={store.getState()}
                     addPost={store.addPost.bind(store)}
                     updateNewPostText={store.updateNewPostText.bind(store)}/>
            </BrowserRouter>,
        document.getElementById('root')
    );
}
reRenderEntireTree()
store.subscribe(reRenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
