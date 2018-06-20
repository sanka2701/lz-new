import React from 'react';
import CKEditor from '../../external/ck_editor';
import { compose } from 'redux'
import withField from './decorators/with_field';
import withErrorSlider from './decorators/with_error_slider';

const BasicContentEditor = ({ onChange, onBlur, value }) => (
    <CKEditor
        events={{
            change : (event) => {
                onChange(event.editor.getData());
            },
            blur : (event) => {
                onBlur();
            },
        }}
        value={value}
    />
);

const FormContentEditor = compose(
    withField,
    withErrorSlider
)(BasicContentEditor);

export default FormContentEditor;