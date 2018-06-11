import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';
import _ from 'lodash';

import { post, get, fetchGooglePlace, placeSelected } from '../actions/index';


import PlaceSearch from '../components/place_search';
import PlaceCreator from '../components/place_editor';

class PlaceHandler extends Component{
    constructor(props){
        super(props);
        this.onSuggestionPlaceSelect = this.onSuggestionPlaceSelect.bind(this);
        this.state = {
            selectedPlace: props.selectedPlace,
            createNewPlace: true
        }
    }

    componentWillReceiveProps({selectedPlace}) {
        if (selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
        }
    }

    get(subname) {
        const request = {
            endpoint: 'places',
            params: {subname},
            successAction: 'PLACES_RECEIVED',
            failureAction: 'nok'
        };
        this.props.get(request);
    }

    submit() {
        const request = {
            endpoint: 'places',
            // payload: {name: 'ahoj', longitude: 19.475004443359353, latitude: 49.07840145059205},
            payload: this.state.selectedPlace, // todo: think of a way to retrieve place from subcomponent
            params: {},
            successAction: 'ok',
            failureAction: 'nok'
        };
        this.props.post(request);
    }

    onSuggestionPlaceSelect(name) {
        this.props.placeSelected(this.props.suggestions[name]);
    }

    onGooglePlaceSelect(placeid) {
        this.props.fetchGooglePlace(placeid)
    }

    toggle() {
        this.setState({
            createNewPlace: !this.state.createNewPlace
        })
    }

    render() {
        const { selectedPlace, createNewPlace } = this.state;

        return (
            <div>
                {createNewPlace ? (
                    <PlaceCreator cb={this.onGooglePlaceSelect.bind(this)} selectedPlace={selectedPlace}/>
                ) : (
                    <PlaceSearch selectedPlace={selectedPlace}
                                 onInputChange={(value) => this.get(value)}
                                 suggestions={this.props.suggestions}
                                 onSuggestionPlaceSelect={(name) => this.onSuggestionPlaceSelect(name)}
                    />
                )}

                <button onClick={this.toggle.bind(this)}>toggle</button>
                <button onClick={this.submit.bind(this)}>post</button>
                <button onClick={this.get.bind(this)}>get</button>
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
        name: '',
        address: '',
        latitude: null,
        longitude: null
    }
};

export default connect(mapStateToProps, { post, get, fetchGooglePlace, placeSelected })(PlaceHandler);


