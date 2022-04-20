import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {StateType} from './App';
import reportWebVitals from './reportWebVitals';
import {addPost} from "./redux/state";
import {BrowserRouter} from "react-router-dom";

/*addPost ('smth')*/

export let reRenderEntireTree = (state:StateType) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App state={state} addPost={addPost}/>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

