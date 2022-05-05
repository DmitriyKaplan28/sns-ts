import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {StateType} from './App';
import reportWebVitals from './reportWebVitals';
import {addPost, updateNewPostText} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

export let reRenderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost} updateNewPostText={updateNewPostText}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

