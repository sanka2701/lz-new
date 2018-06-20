import React from 'react';
import { Field } from 'redux-form';

const withField = (WrappedComponent) => ({ name, validate, ...props }) => {
    // debugger;
    return (
        <Field name={name} component={WrappedComponent} validate={validate} {...props} />
)};

export default withField;