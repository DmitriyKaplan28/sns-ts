import React, {FC} from "react";
import styles from "./FormControls.module.css";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
	meta: WrappedFieldMetaProps
}

export const FormControl: FC<FormControlPropsType> = ({
	meta: {touched, error},
	children
}) => {
	const errorCondition = touched && error;
	return (
		<div className={styles.formControl + " " + (errorCondition ? styles.error : "")}>
			<div>
				{children}
			</div>
			{errorCondition && <span>{error}</span>}
		</div>
	);
};

export const TextArea: FC<WrappedFieldProps> = ({input, meta, ...restProps}) => {
	return (
		<FormControl meta={meta}> <textarea {...input} {...restProps}/> </FormControl>
	);
};

export const Input: FC<WrappedFieldProps> = ({input, meta, ...restProps}) => {
	return (
		<FormControl meta={meta}> <input {...input} {...restProps}/> </FormControl>
	);
};

export const createField = (placeHolder: string | null, name: string,
	component: React.FC<WrappedFieldProps>, validators: ((value: string) => string | undefined)[],
	props = {}, text = "") => (
	<div>
		<Field placeholder={placeHolder}
			   name={name}
			   component={component}
			   validate={validators}
			   {...props}
		/>{text}
	</div>
);