import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormGroup, Label, Row, Col, Input, Button, Collapse } from 'reactstrap';
import _ from 'lodash';

import { post, get, fetchGooglePlace, placeSelected } from '../actions/index';

import { FormattedMessage } from 'react-intl';
import AutocompleteInput from '../components/autocomplete_input';

import MapDisplay from '../components/map_display';
import MapEditor from '../components/map_editor';

// todo: if editor is opened with pre-set values update maps to given lat and lon
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

    submit() {
        // todo: remove - test only
        const request = {
            endpoint: 'places',
            payload: {label: 'ahoj', address: 'volaka adresa', lon: 19.475004443359353, lat: 49.07840145059205},
            // payload: this.state.selectedPlace,
            params: {},
            successAction: 'ok',
            failureAction: 'nok'
        };
        this.props.post(request);
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

    renderAutocomplete = ({ input: { onChange, value }, suggestions}) => (
        <AutocompleteInput
            onInputChange={(value) => { this.get(value); onChange(value) }}
            onSuggestionSelect={(label) => { this.onSuggestionPlaceSelect(label); onChange(label) }}
            suggestions={suggestions}
            value={value}
        />
    );

    renderInput = ({input, disabled}) => (
        <Input {...input} disabled={disabled}/>
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
                        <FormGroup>
                            <Label>
                                <FormattedMessage id={'places.label'} defaultMessage='Name the place'/>
                            </Label>

                            <Field
                                name={'place.label'}
                                component={this.renderAutocomplete}
                                suggestions={this.props.suggestions}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Collapse isOpen={this.state.showMap}>
                    <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Col sm="12">
                            <Label>
                                <FormattedMessage id={'places.address'} defaultMessage='Address'/>
                            </Label>
                            <Field
                                name={'place.address'}
                                component={this.renderInput}
                                disabled={!this.state.createNewPlace}
                            />
                        </Col>
                    </Row>

                    <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Col sm="6">
                            <Label>
                                <FormattedMessage id={'places.lat'} defaultMessage='Latitude'/>
                            </Label>
                            <Field
                                name={'place.lat'}
                                component={this.renderInput}
                                disabled={true}
                            />
                        </Col>
                        <Col sm="6">
                            <Label>
                                <FormattedMessage id={'places.lon'} defaultMessage='Longitude'/>
                            </Label>
                            <Field
                                name={'place.lon'}
                                component={this.renderInput}
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


                <button type='button' onClick={this.submit.bind(this)}>post</button>
                {/*<button type='button' onClick={this.get.bind(this)}>get</button>*/}
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


