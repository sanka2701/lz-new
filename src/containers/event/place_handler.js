import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { FormGroup, Label, Row, Col, Input, Button, Collapse } from 'reactstrap';
import ErrorSlider from '../../components/ui/error_slider';
import { required } from '../../utils/valdiators';

import { post, get, fetchGooglePlace, placeSelected } from '../../actions/index';

import { FormattedMessage } from 'react-intl';
import AutocompleteInput from '../../components/autocomplete_input';

import MapDisplay from '../../components/map/map_display';
import MapEditor from '../../components/map/map_editor';

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
            // payload: {label: 'ahoj', address: 'volaka adresa', lon: 19.475004443359353, lat: 49.07840145059205},
            payload: this.state.selectedPlace,
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

    renderAutocomplete = ({ input: { onChange, value }, suggestions, meta}) => {
        // todo: fix error message, touched is not changing after value edit (??? call onBlur ???)
        // debugger;
    return (
        <div>
            <AutocompleteInput
                // onBlur={(e) => {AutocompleteInput.onBlur(e)}}
                onInputChange={(value) => { onChange(value); this.get(value); }}
                onSuggestionSelect={(label) => { onChange(label); this.onSuggestionPlaceSelect(label); }}
                suggestions={suggestions}
                value={value}
            />
            <ErrorSlider
                errorCode={meta.error}
                displayed={meta.touched && meta.error}
            />
        </div>
    )};

    renderInput = ({input, disabled, meta}) => (
        <div>
            <Input {...input} disabled={disabled}/>
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
                        <FormGroup>
                            <Label>
                                {
                                    this.state.createNewPlace ? (
                                        <FormattedMessage id={'places.nameLabel'} defaultMessage='Name the place'/>
                                    ) : (
                                        <FormattedMessage id={'places.searchLabel'} defaultMessage='Search for place'/>
                                    )
                                }
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
                                validate={[required]}
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
                                validate={[required]}
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
                                validate={[required]}
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


