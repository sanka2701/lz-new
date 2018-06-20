import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormGroup, Label, Row, Col, Input, Button, Collapse } from 'reactstrap';
import ErrorSlider from '../../components/ui/error_slider';
import { required } from '../../utils/valdiators';

import { post, get, fetchGooglePlace, placeSelected } from '../../actions/index';

import { FormattedMessage } from 'react-intl';
import AutocompleteInput from '../../components/autocomplete_input';

import FormInput from '../../components/ui/fields/form_input';
import FormAutocomplete from '../../components/ui/fields/form_autocomplete';

import MapDisplay from '../../components/map/map_display';
import MapEditor from '../../components/map/map_editor';

class PlaceHandler extends Component{
    constructor(props){
        super(props);
        this.onSuggestionPlaceSelect = this.onSuggestionPlaceSelect.bind(this);
        this.state = {
            showMap: true,
            selectedPlace: props.selectedPlace,
            createNewPlace: true
        }
    }

    componentWillReceiveProps({selectedPlace}) {
        // debugger;
        if (selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
            this.props.change('place.label',   selectedPlace.label);
            this.props.change('place.address', selectedPlace.address);
            this.props.change('place.lat',     selectedPlace.lat);
            this.props.change('place.lon',     selectedPlace.lon);
        }
    }

    get(subname) {
        console.log('Fetching place suggestions ....');
        const request = {
            endpoint: 'places',
            params: {subname},
            successAction: 'PLACES_RECEIVED',
            failureAction: 'nok'
        };
        this.props.get(request);
    }

    onSuggestionPlaceSelect(name) {
        console.log('Suggestion selected ....');
        this.props.placeSelected(this.props.suggestions[name]);
    }

    onMapPlaceSelect({placeid, lat, lon}) {
        if( placeid ) {
            this.props.fetchGooglePlace(placeid);
        } else {
            this.props.placeSelected({lat, lon, address: '', label: ''});
        }
    }

    togglePickCreate() {
        this.setState({
            createNewPlace: !this.state.createNewPlace
        })
    }

    toogleMap() {
        this.setState({
            showMap : !this.state.showMap
        })
    }

    renderAutocomplete = ({ input, suggestions, meta }) => (
        <div>
            <AutocompleteInput
                {...input}
                onInputChange={(value) => { input.onChange(value); this.get(value); }}
                onSuggestionSelect={(label) => { input.onChange(label); this.onSuggestionPlaceSelect(label); }}
                suggestions={suggestions}
            />
            <ErrorSlider
                errorCode={meta.error}
                displayed={meta.touched && meta.error}
            />
        </div>
    );

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <Button color="primary" type='button' onClick={this.togglePickCreate.bind(this)}>
                            Create/Pick
                        </Button>
                    </Col>
                    <Col>
                        <Button color="info" type='button' onClick={this.toogleMap.bind(this)}>
                            Show/Hide
                        </Button>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px', marginBottom: '10px'}}>
                    <Col sm="12">
                        <FormAutocomplete
                            name={'place.label'}
                            suggestions={this.props.suggestions}
                            messageId={this.state.createNewPlace ? 'places.nameLabel' : 'places.searchLabel'}
                            defaultMessage={this.state.createNewPlace ? 'Name the place' : 'Search for place'}
                            onSuggestionPlaceSelect={this.onSuggestionPlaceSelect.bind(this)}
                            getValues={this.get.bind(this)}
                        />
                    </Col>
                </Row>

                <Collapse isOpen={this.state.showMap}>
                    <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Col sm="12">
                            <FormInput
                                messageId={'places.address'}
                                defaultMessage={'Address'}
                                name={'place.address'}
                                validate={[required]}
                                disabled={!this.state.createNewPlace}
                            />
                        </Col>
                    </Row>

                    <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Col sm="6">
                            <FormInput
                                messageId={'places.lat'}
                                defaultMessage={'Latitude'}
                                name={'place.lat'}
                                validate={[required]}
                                disabled={true}
                            />
                        </Col>
                        <Col sm="6">
                            <FormInput
                                messageId={'places.lon'}
                                defaultMessage={'Longitude'}
                                name={'place.lon'}
                                validate={[required]}
                                disabled={true}
                            />
                        </Col>
                    </Row>

                    {this.state.createNewPlace ? (
                        <MapEditor onPlaceSelect={this.onMapPlaceSelect.bind(this)} selectedPlace={this.state.selectedPlace}/>
                    ) : (
                        <MapDisplay selectedPlace={this.state.selectedPlace} />
                    )}
                </Collapse>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        suggestions: state.places.suggestions,
        selectedPlace : state.places.selectedPlace
    }
}

PlaceHandler.defaultProps = {
    selectedPlace: {
        label: '',
        address: '',
        lat: null,
        lon: null
    }
};

export default connect(mapStateToProps, { post, get, fetchGooglePlace, placeSelected })(PlaceHandler);
