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
}