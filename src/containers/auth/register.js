import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import _ from 'lodash';
import { AUTH_USER, AUTH_ERROR } from '../../actions/types'
import { post } from '../../actions';

const FIELDS = {
    email: {
        id: 'email',
        type: 'email',
        i18nText: 'auth.email',
        defaultMsg: 'Email',
        mandatory: false
    },
    username: {
        id: 'username',
        type: 'text',
        i18nText: 'auth.username',
        defaultMsg: 'Username',
        mandatory: true
    },
    password: {
        id: 'password',
        type: 'password',
        i18nText: 'auth.password',
        defaultMsg: 'Password',
        mandatory: true
    },
    passwordVerify: {
        id: 'passwordVerify',
        type: 'password',
        i18nText: 'auth.passwordVerify',
        defaultMsg: 'Repeat Password',
        mandatory: true
    }
};

class Register extends Component{
    renderField(field) {
        const errorMessage = (field.meta.touched && field.meta.error) && (
            <Alert color="danger">
                <FormattedMessage id={field.meta.error} defaultMessage='Mandatory Field'/>
            </Alert>
        );

        return (
            <FormGroup>
                <Label for={field.config.id}>
                    <FormattedMessage id={field.config.i18nText} defaultMessage={field.config.defaultMsg}/>
                </Label>
                <Input type={field.config.type} id={field.config.id} {...field.input}/>
                {errorMessage}
            </FormGroup>
        )
    }

    addFormField(fieldConfig) {
        return (
            <Field key={fieldConfig.id}
                   name={fieldConfig.id}
                   config={fieldConfig}
                   component={this.renderField}
            />
        )
    }

    onSubmit = formProps => {
        const request = {
            endpoint: 'users',
            payload: formProps,
            successAction: AUTH_USER,
            failureAction: AUTH_ERROR,
            successCallback: () => {
                this.props.history.push('/')
            }
        };
        this.props.post(request);
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <h3>
                    <FormattedMessage id='auth.register' defaultMessage='Register'/>
                </h3>
                {_.map(FIELDS, this.addFormField.bind(this))}
                <Button type='submit' color="primary">
                    <FormattedMessage id='general.submit' defaultMessage='Submit'/>
                </Button>{' '}
                <Button type='button' color="warning">
                    <FormattedMessage id='general.cancel' defaultMessage='Cance'/>
                </Button>{' '}
                <div>
                    {JSON.stringify(this.props.errorMessage)}
                </div>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if(!values[field] && type.mandatory) {
            errors[field] = 'auth.mandatoryField';
        }
    });

    if(values.password !== values.passwordVerify) {
        errors.passwordVerify = 'auth.passwordMismatch';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage}
}

export default compose(
    connect(mapStateToProps, {post}),
    reduxForm({form: 'register', validate})
)(Register);
