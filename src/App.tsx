import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Routes, Route} from "react-router-dom";
import {ReduxStoreType} from "./redux/redux-store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";


export type AppStateType = {
    /*store: ReduxStoreType*/
}

function App(props: AppStateType) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    {/*<Route path='/dialogs' element={<DialogsContainer dialogsState={props.store.getState().dialogsPage}
                                                             dispatch={props.store.dispatch.bind(props.store)}
                    />}/>*/}
                    <Route path='/dialogs' element={<DialogsContainer />}/>
                    {/*<Route path='/profile' element={<Profile profileState={props.store.getState().profilePage}
                                                             dispatch={props.store.dispatch.bind(props.store)}
                    />}/>*/}
                    <Route path='/profile' element={<Profile />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
