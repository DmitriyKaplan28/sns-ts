import React from 'react';
import styles from './Contact.module.css'

type contactPropsType = {
    title: string
    value: string
}

export const Contact = ({title, value}: contactPropsType) => {
    return (
        <div className={styles.contact}>
            <b>{title}</b>:{value}
        </div>
    );
};