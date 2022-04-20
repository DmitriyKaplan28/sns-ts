import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile, ProfileStateType} from "./components/Profile/Profile";
import {Dialogs, DialogsStateType} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Routes, Route} from "react-router-dom";



export type StateType= {
    profilePage: ProfileStateType
    dialogsPage: DialogsStateType
}

export type AppStateType = {
    state: StateType
    addPost: (postMessage:string)=> void
}

function App(props:AppStateType) {
  return (
        <div className='app-wrapper'>
          <Header/>
          <Navbar/>
          <div className='app-wrapper-content'>
            <Routes>
              <Route path='/dialogs' element={<Dialogs dialogsState={props.state.dialogsPage}/>}/>
              <Route path='/profile' element={<Profile profileState={props.state.profilePage} addPost={props.addPost}/>}/>
            </Routes>
          </div>
        </div>
  );
}

export default App;
