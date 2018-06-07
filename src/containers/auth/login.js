import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import _ from 'lodash';
import { loginUser } from '../../actions';

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
        this.props.loginUser(formProps);
    };

    render() {
        const { handleSubmit } = this.props;

        return (
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
    connect(null, {loginUser}),
    reduxForm({form: 'login', validate})
)(Login);
