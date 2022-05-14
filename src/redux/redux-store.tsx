import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
});

export let store = legacy_createStore(rootReducers);

export type ReduxStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducers>