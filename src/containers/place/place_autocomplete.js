import React from 'react';
import FormAutocomplete from '../../components/ui/fields/form/form_autocomplete';
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
      const { suggestions, formName } = this.props;
      this.props.selectPlace(suggestions[placeId], formName);
    }

    render() {
      const { suggestions } = this.props;

      return (
        <FormAutocomplete
          name={'label'}
          onSuggestionSelect={this.onSuggestionSelect}
          suggestions={values(suggestions)}
          messageId={'place.searchLabel'}
          defaultMessage={'Search for place'}
        />
      )
    }
}

const mapStateToProps = ({ places }) => {
  return{
		suggestions: places.byId
  }
};

export default connect(mapStateToProps, { loadPlaces, selectPlace })(PlaceAutocomplete);