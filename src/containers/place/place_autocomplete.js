import React from 'react';
import FormAutocomplete from '../../components/ui/fields/form_autocomplete';
import { formValueSelector } from 'redux-form';
import { get, placeSelected } from '../../actions/index';
import { connect } from 'react-redux';
import _ from 'lodash';
import { INPUT_SEARCH_DELAY } from '../../utils/constant';

class PlaceAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
        this.onValueChanged     = this.onValueChanged.bind(this);
        this.triggerFetch       = this.triggerFetch.bind(this);
        this.state={
            value: props.value,
            suggestions : props.suggestions
        }
    }

    componentWillReceiveProps({suggestions}) {
        if (suggestions !== this.state.suggestions) {
            this.setState({ suggestions });
        }
    }

    componentWillMount() {
        this.timer = null;
    }

    triggerFetch() {
        const { value } = this.state;
        if(!!value) {
            console.log('Fetching place suggestions ....', value);
            const request = {
                endpoint: 'places',
                params: { subname : value },
                successAction: 'PLACES_LOADED',
                failureAction: 'nok'
            };
            this.props.get(request);
        }
    }

    onValueChanged(value) {
        console.log('value', value);

        this.setState({ value });
        clearTimeout(this.timer);
        this.timer = setTimeout(this.triggerFetch, INPUT_SEARCH_DELAY);
    }

    onSuggestionSelect(placeId) {
        this.props.placeSelected(this.state.suggestions[placeId]);
    }

    render() {
        return (
            <FormAutocomplete
                name={'place.label'}
                onInputChange={this.onValueChanged}
                onSuggestionSelect={this.onSuggestionSelect}
                suggestions={_.values(this.state.suggestions)}
                messageId={'places.searchLabel'}
                defaultMessage={'Search for place'}
            />
        )
    }
}

const selector = formValueSelector('create_event');

const mapStateToProps = (state) => {
    return{
        suggestions: state.places,
        value: selector(state, 'place.label')
    }
};

export default connect(mapStateToProps, { get, placeSelected })(PlaceAutocomplete);