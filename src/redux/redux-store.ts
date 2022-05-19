import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {usersReducer} from "./usersReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage:usersReducer
});

export let store = legacy_createStore(rootReducer);

export type ReduxStoreType = typeof store

export type AppStateType = ReturnType<typeof rootReducer>