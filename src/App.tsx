import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {PostPropsType} from "./components/Profile/MyPosts/Post/Post";
import {DialogType} from "./components/Dialogs/Dialog/Dialog";
import {dialogs, messages} from "./index";
import {MessageType} from "./components/Dialogs/Message/Message";


export type DataType ={
    posts?: PostPropsType[]
    dialogs?: DialogType[]
    messages?: MessageType[]
}

function App(props:DataType) {
  return (
      <BrowserRouter>

        <div className='app-wrapper'>
          <Header/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <Routes>
              <Route path='/dialogs' element={<Dialogs dialogs={dialogs} messages={messages}/>}/>
              <Route path='/profile' element={<Profile posts={props.posts}/>}/>
              {/*<Route path='/news' element={<News />}/>
              <Route path='/music' element={<Music />}/>
              <Route path='/settings' element={<Profile />}/>*/}
            </Routes>
          </div>
        </div>

      </BrowserRouter>
  );
}

export default App;
