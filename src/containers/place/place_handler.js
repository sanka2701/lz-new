import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Row, Col, Button, Collapse } from 'reactstrap';
import { required } from '../../utils/valdiators';
import MapDisplay from '../../components/map/map_display';
import MapEditor from '../map/map_editor';
import FormInput from '../../components/ui/fields/form_input';
import PlaceAutocomplete from './place_autocomplete';

class PlaceHandler extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMap: true,
            createNewPlace: true
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
                <Row style={{textAlign: 'center'}}>
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
                        <MapEditor  selectedPlace={this.props.currentPlace} />
                    ) : (
                        <MapDisplay selectedPlace={this.props.currentPlace} />
                    )}
                </Collapse>
            </div>
        )
    }
}

const selector = formValueSelector('create_event');

function mapStateToProps(state) {
    return {
        currentPlace : selector(state, 'place')
    }
}

export default connect(mapStateToProps)(PlaceHandler);
