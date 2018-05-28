import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class Login extends Component{
    render() {
        return (
            hello
        )
    }
}

export default reduxForm({
    form: 'login',
    fields: ['username', 'password']
})(Login);