import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import _ from 'lodash';

class Register extends Component{
    render() {
        return (
            <form>
                <h3>
                    <FormattedMessage id='auth.register' defaultMessage='Register'/>
                </h3>
                Nazdar!
            </form>
        )
    }
}

function validate(values) {
    const errors = {};

    return errors;
}

export default reduxForm({
    form: 'register',
    validate
})(Register);