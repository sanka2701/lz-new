import React from 'react';
import { Input } from 'reactstrap';

const BasicInput = ({ input, ...props }) => (
    <Input {...input} {...props} />
);

export default BasicInput;