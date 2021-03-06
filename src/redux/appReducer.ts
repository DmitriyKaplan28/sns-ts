import {ActionTypes} from "./store";
import {ThunkDispatchType, ThunkType} from "./usersReducer";
import {getAuthUserDataThunkCreator} from "./authReducer";

const SET_INITIALIZED = 'SET-INITIALIZED'

export type AuthPropsType = {
    initialized: boolean
}

let initialState: AuthPropsType = {
    initialized: false
}

export const appReducer = (state: AuthPropsType = initialState, action: ActionTypes): AuthPropsType => {

    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: true};
        default:
            return state;
    }
}

export const setInitializedAC = () => {
    return {
        type: SET_INITIALIZED
    } as const
}

/*export const asd = (): ThunkType => (dispatch: ThunkDispatchType) => {
        let promise = dispatch(getAuthUserDataThunkCreator());
        promise.then(()=>{dispatch(setInitializedAC)})
}*/

export const initializeTC  = (): ThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(getAuthUserDataThunkCreator());
    debugger
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedAC());
        });

}
