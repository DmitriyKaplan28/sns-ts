import React from 'react';
import {ProfileType} from "../../ProfileContainer";
import {createField, Input, TextArea} from "../../../../common/components/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from './ProfileDataForm.module.css'

const ProfileForm: React.FC<InjectedFormProps<ProfileType>> = ({handleSubmit, initialValues, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>Save profile</button>

            {error && <div className={style.error}>
                {error}
            </div>}

            <div>
                <b>Full name</b>: {createField("Full name", "fullName", Input, [])}
            </div>

            <div>
                <b>Looking for a
                    job</b>: {createField(null, 'lookingForAJob', Input, [], {type: 'checkbox'},)}
            </div>
            <div>
                <b>My professional
                    skills</b>{createField(null, 'lookingForAJobDescription', TextArea, [])}
            </div>
            <div>
                <b>About me</b>: {createField(null, 'aboutMe', TextArea, [])}
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(initialValues.contacts ?? {}).map(key => {
                return <div key={key} >
                    <b>{key}: {createField(key, 'contacts.' + key, Input, [], )}</b>
                </div>
            })}
            </div>
        </form>
    );
};

export const ProfileDataForm = reduxForm<ProfileType>({form: 'edit-profile'})(ProfileForm)