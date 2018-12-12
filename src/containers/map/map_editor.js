import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { selectGooglePOI, selectPlace } from '../../actions/index';
import { Row, Col } from 'reactstrap';
import MapPicker from '../../components/map/map_picker'

class MapEditor extends Component{
    constructor(props){
        super(props);
        this.setMarker = this.setMarker.bind(this);
        this.state = {
            selectedPlace: props.selectedPlace
        }
    }

    componentWillReceiveProps({selectedPlace}) {
        if (selectedPlace !== this.state.selectedPlace) {
            this.setState({ selectedPlace });
        }
    }

    setMarker(coordinates, placeid) {
        const {formName} = this.props;
        this.setState(prevState => ({
            selectedPlace: {
                ...prevState.selectedPlace,
                ...coordinates
            }
        }));

        placeid ?
            this.props.selectGooglePOI(placeid) :
            this.props.selectPlace({...coordinates, address: '', label: ''}, formName);
    }

    render() {
        return (
            <div>
                <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Col>
                        <MapPicker
                            onMarkerSet={this.setMarker}
                            selectedPlace={this.state.selectedPlace}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

MapEditor.propTypes = {
    formName: PropTypes.string,
    selectedPlace : PropTypes.object
};

MapEditor.defaultProps = {
    selectedPlace: {
        label: '',
        lat: '',
        lon: ''
    }
};

export default connect(null, { selectGooglePOI, selectPlace })(MapEditor);
