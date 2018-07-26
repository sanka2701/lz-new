import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import { post } from '../../actions';
import { AUTH_USER, AUTH_ERROR } from '../../actions/types'
import BorderCol from '../../components/ui/content/bordered_content';
import _ from 'lodash';

const FIELDS = {
    username: {
        id: 'username',
        type: 'text',
        i18nText: 'auth.username',
        defaultMsg: 'Username'
    },
    password: {
        id: 'password',
        type: 'password',
        i18nText: 'auth.password',
        defaultMsg: 'Password',
    }
};

class Login extends Component{
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
            endpoint: 'users/login',
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
            <BorderCol>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <h3>
                        <FormattedMessage id='auth.login' defaultMessage='Login'/>
                    </h3>
                    {_.map(FIELDS, this.addFormField.bind(this))}
                    <Button type='submit' color="primary">
                        <FormattedMessage id='general.submit' defaultMessage='Submit'/>
                    </Button>{' '}
                    <Button type='button' color="warning">
                        <FormattedMessage id='general.cancel' defaultMessage='Cance'/>
                    </Button>{' '}
                </form>
            </BorderCol>
        )
    }
}

function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if(!values[field]) {
            errors[field] = 'auth.mandatoryField';
        }
    });

    return errors;
}

export default compose(
    connect(null, {post}),
    reduxForm({form: 'login', validate})
)(Login);
