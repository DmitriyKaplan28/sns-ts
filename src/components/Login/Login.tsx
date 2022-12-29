import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {createField, Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from './Login.module.css';

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}
type MDTPLoginType = {
    login: (email: string, password: string, rememberMe: boolean) => void
}
type MSTPLoginType = {
    isAuth: boolean
    userId: number | null
}

type LoginPropsType = MDTPLoginType & MSTPLoginType

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField('email', 'login', Input, [requiredField])}
            {createField('password', 'password', Input, [requiredField], {type: 'password'})}
            {createField(null, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}

            {error && <div className={style.formAllError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate replace to={`/profile/${props.userId}`}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

let mapStateToProps = (state: AppStateType): MSTPLoginType => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId
})

export default connect(mapStateToProps, {login: loginThunkCreator})(Login)