import React, {lazy, Suspense} from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {UsersContainer} from "./components/Users/UsersContainer";
import {WithRouter} from "./components/Profile/ProfileContainer";
import {HeaderContainer} from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeTC} from "./redux/appReducer";
import {AppStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


const DialogsContainer = lazy(() =>
    import('./components/Dialogs/DialogsContainer')
        .then(({DialogsContainer}) => ({default: DialogsContainer})),
);

const ProfileContainer = lazy(() =>
    import('./components/Profile/ProfileContainer')
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

    handleError = () => {

    }

    componentDidMount() {
        this.props.initializeTC()
        window.addEventListener("unhandledrejection", function (pro) {
        }
    }

)


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