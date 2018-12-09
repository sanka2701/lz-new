import React from 'react';
import FormAutocomplete from '../../components/ui/fields/form_autocomplete';
import { formValueSelector } from 'redux-form';
import { loadPlaces, selectPlace } from '../../actions/index';
import { connect } from 'react-redux';
import { values } from 'lodash';

class PlaceAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.onSuggestionSelect = this.onSuggestionSelect.bind(this);
    }

    componentDidMount() {
      this.props.loadPlaces();
    }

    onSuggestionSelect(placeId) {
      const { suggestions } = this.props;
        this.props.selectPlace(suggestions[placeId]);
    }

    render() {
      const { suggestions } = this.props;

      return (
        <FormAutocomplete
          name={'place.label'}
          onSuggestionSelect={this.onSuggestionSelect}
          suggestions={values(suggestions)}
          messageId={'places.searchLabel'}
          defaultMessage={'Search for place'}
        />
      )
    }
}

const selector = formValueSelector('create_event');

const mapStateToProps = ({ places }) => {
  return{
      suggestions: places.byId,
      value: selector(places, 'label')
  }
};

export default connect(mapStateToProps, { loadPlaces, selectPlace })(PlaceAutocomplete);