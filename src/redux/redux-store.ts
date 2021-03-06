import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer";
import thunkMiddleWare from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import {appReducer} from "./appReducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage:usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

export let store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export type AppStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;