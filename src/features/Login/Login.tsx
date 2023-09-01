import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../../common/components/FormControls/FormControls";
import {requiredField} from "../../common/utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../store/authReducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../store/redux-store";
import style from "./Login.module.css";

type FormDataType = {
	login: string
	password: string
	rememberMe: boolean
	captchaURL: string | null
}
type MDTPLoginType = {
	login: (email: string, password: string, rememberMe: boolean, captchaURL: string | null) => void
}
type MSTPLoginType = {
	isAuth: boolean
	userId: number | null
	captchaURL: string | null
}

type LoginPropsType = MDTPLoginType & MSTPLoginType

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({
	handleSubmit,
	error,
	initialValues
}) => {
	return (
		<form onSubmit={handleSubmit}>

			{createField("email", "login", Input, [requiredField])}
			{createField("password", "password", Input, [requiredField], {type: "password"})}
			{createField(null, "rememberMe", Input, [], {type: "checkbox"}, "remember me")}

			{initialValues.captchaURL && <img src={initialValues.captchaURL} alt=""/>}
			{initialValues.captchaURL && createField("Image symbols", "captchaURL", Input, [requiredField],)}

			{error && <div className={style.formAllError}>
				{error}
			</div>}
			<div>
				<button>Login</button>
			</div>
		</form>
	);
};

const LoginReduxForm = reduxForm<FormDataType>({form: "login"})(LoginForm);

const Login = (props: LoginPropsType) => {
	const onSubmit = (formData: FormDataType) => {
		props.login(formData.login, formData.password, formData.rememberMe, formData.captchaURL);
	};

	if (props.isAuth) {
		return <Navigate replace to={`/profile/${props.userId}`}/>;
	}

	return (
		<div>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit}/>
		</div>
	);
};

const mapStateToProps = (state: AppStateType): MSTPLoginType => ({
	isAuth: state.auth.isAuth,
	userId: state.auth.userId,
	captchaURL: state.auth.captchaURL,
});

export default connect(mapStateToProps, {login: loginThunkCreator})(Login);