import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Routes, Route} from "react-router-dom";
import {StoreType} from "./redux/state";


export type AppStateType = {
    store: StoreType
}

function App(props: AppStateType) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path='/dialogs' element={<Dialogs dialogsState={props.store.getState().dialogsPage}
                                                             dispatch={props.store.dispatch.bind(props.store)}
                    />}/>
                    <Route path='/profile' element={<Profile profileState={props.store.getState().profilePage}
                                                             dispatch={props.store.dispatch.bind(props.store)}
                    />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
