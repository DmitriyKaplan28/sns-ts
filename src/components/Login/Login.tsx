import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from "../common/FormControls/FormControls";
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

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'login'} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={'password'} type={'password'} component={Input}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            {props.error && <div className={style.formAllError}>
                {props.error}
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