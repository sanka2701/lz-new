import React from 'react';
import AutocompleteInput from '../../autocomplete_input';
import { compose } from 'redux'
import withField from './decorators/with_field';
import withLabel from './decorators/with_label';
import withErrorSlider from './decorators/with_error_slider';


const BasicAutocomplete = ({ onChange, suggestions, getValues, onSuggestionPlaceSelect, props }) => (
    <AutocompleteInput
        {...props}
        onInputChange={(value) => { onChange(value); getValues(value); }}
        onSuggestionSelect={(label) => { onChange(label); onSuggestionPlaceSelect(label); }}
        suggestions={suggestions}
    />
);

const FormAutocomplete = compose(
    withLabel,
    withField,
    withErrorSlider
)(BasicAutocomplete);

export default FormAutocomplete;