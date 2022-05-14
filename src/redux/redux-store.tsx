import {combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";

let rootReducers = combineReducers({
    profileReducer: profileReducer,
    dialogsReducer: dialogsReducer,
});

export let store = legacy_createStore(rootReducers);
