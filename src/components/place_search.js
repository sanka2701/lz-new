import React from 'react';
import { Container, Row, Col} from 'reactstrap';
import _ from 'lodash';
import PropTypes from "prop-types";

import PlaceDisplay from '../components/map_display';
import AutocompleteInput from '../components/autocomplete_input';

const PlaceSearch = ({selectedPlace, onInputChange, suggestions, onSuggestionPlaceSelect}) => {
    return(
        <Container>
            <Row>
                <Col>
                    <AutocompleteInput onInputChange={(value) => onInputChange(value)}
                                       onSuggestionSelect={(name) => onSuggestionPlaceSelect(name)}
                                       suggestions={_.values(suggestions)}
                                       inputValue={selectedPlace.name}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <PlaceDisplay title={selectedPlace.name}
                                  coordinates={{lat: selectedPlace.latitude, lng: selectedPlace.longitude}} />
                </Col>
            </Row>
        </Container>
    )
};

export default PlaceSearch;