import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Collapse } from 'reactstrap';
import { required } from '../../utils/valdiators';
import MapDisplay from '../../components/map/map_display';
import MapEditor from './map_editor';
import FormInput from '../../components/ui/fields/form_input';
import PlaceAutocomplete from './place_autocomplete';

class PlaceHandler extends Component{
    constructor(props){
        super(props);
        // todo: map marker is not ser when initialized with values
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
                        <PlaceAutocomplete />
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
                        <MapEditor  selectedPlace={this.state.selectedPlace}/>
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

export default connect(mapStateToProps)(PlaceHandler);
