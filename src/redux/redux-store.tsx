import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
});

export let store = legacy_createStore(rootReducer);

export type ReduxStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>