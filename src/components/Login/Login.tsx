import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={'login'} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'}/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};








/*
import React from 'react';
import { Form, Field } from 'react-final-form'

export const Login = () => {
    return <div>
        <h1>
            Login
        </h1>
        <LoginReduxForm/>
    </div>;
};

export const LoginForm = () => {
    return <form>
        <div><input placeholder={'Login'}/></div>
        <div><input placeholder={'Password'}/></div>
        <div><input type={'checkbox'}/>remember me</div>
        <div>
            <button>Login</button>
        </div>
    </form>
        ;
};

const LoginReduxForm = () => {
    const onSubmit = () => {
        console.log('123')
    }
    return <Form onSubmit={onSubmit}>
        {props => (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field name="login" component="input" placeholder="Login" />
                </div>
                <div>
                    <Field name="password" component="input" placeholder="Password" />
                </div>
                <div>
                    <Field name='rememberMe' component="input" type="checkbox" />Remember me
                </div>
                <button>Login</button>
            </form>
        )}
    </Form>
}*/
