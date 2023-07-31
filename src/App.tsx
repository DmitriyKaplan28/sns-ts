import React, {lazy, Suspense} from 'react';
import './App.css';
import {Navbar} from "./features/Navbar/Navbar";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {UsersContainer} from "./features/Users/UsersContainer";
import {WithRouter} from "./features/Profile/ProfileContainer";
import {HeaderContainer} from "./features/Header/HeaderContainer";
import Login from "./features/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeTC} from "./store/appReducer";
import {AppStateType, store} from "./store/redux-store";
import {Preloader} from "./common/components/Preloader/Preloader";


const DialogsContainer = lazy(() =>
    import('./features/Dialogs/DialogsContainer')
        .then(({DialogsContainer}) => ({default: DialogsContainer})),
);

const ProfileContainer = lazy(() =>
    import('./features/Profile/ProfileContainer')
        .then(({ProfileContainer}) => ({default: ProfileContainer})),
);

type MapStateToPropsType = {
    initialized: boolean
}

type MapDispatchToPropsType = {
    initializeTC: () => void
}

type AppType = MapDispatchToPropsType & MapStateToPropsType

class App extends React.Component<AppType> {

    handleError = (promiseRejectionEvent: any) => {
        alert('Error');
        console.error(promiseRejectionEvent)

    }

    componentDidMount() {
        this.props.initializeTC()
        window.addEventListener("unhandledrejection", this.handleError)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.handleError)
    }


    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path='/dialogs' element={
                            <Suspense fallback={<Preloader/>}>
                                <DialogsContainer/>
                            </Suspense>
                        }/>
                        <Route path='/profile/:userId' element={
                            <Suspense fallback={<Preloader/>}>
                                <ProfileContainer/>
                            </Suspense>
                        }/>
                        {/*<Route path='/profile' element={<ProfileContainer/>}/>*/}
                        <Route path='/users' element={<UsersContainer/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/*' element={<div>404 NOT FOUND</div>}/>
                        <Route path='/'
                               element={<Navigate to="/profile/:userId" replace/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(connect(mapStateToProps, {initializeTC}), WithRouter)(App);

export const SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}