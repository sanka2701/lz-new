import React from 'react';
import BasicInput from './basic_input';
import withField from './with_field';
import withLabel from './with_label';
import withErrorSlider from './with_error_slider';


const ModifiedInput = withLabel(withField(withErrorSlider(BasicInput)));

export default ModifiedInput;