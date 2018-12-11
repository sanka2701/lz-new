import React from 'react';
import { connect } from 'react-redux';
import PlaceFilter from '../../components/place/place_filter';
import PlaceList from '../../components/place/place_list';
import {
  Row,
  Col,
  Input,
  Button,
  Collapse} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import { loadPlaces, setPlaceFilter, resetPlaceFilter } from '../../actions';
import { makeGetPlacesByFilter } from '../../filters/places_filter';

import { ShowHide, Add, Reset } from '../../components/ui/icons';

class PlaceTop extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mapShown: true
    }
  }

  componentDidMount() {
    this.props.loadPlaces();
  }

  render = () => {
    const { places, filter, setPlaceFilter } = this.props;
    const { mapShown } = this.state;

    return (
      <React.Fragment>
        <BorderCol sm={12}>
          <Row>
            <Col>
              <ShowHide
                isCrossed={this.state.mapShown}
                onClick={() => this.setState({ mapShown: !mapShown })}
              />{' '}
              <Add
                messageId={'icon.tooltip.createPlace'}
                onClick={() => {}}
              />{' '}
              <Reset
                onClick={() => {}}
              />{' '}
            </Col>
          </Row>
          <Collapse isOpen={mapShown}>
            <PlaceFilter
              filter={filter}
              markers={places}
              onPlaceFilterChanged={setPlaceFilter}
            />
          </Collapse>
        </BorderCol>
        <PlaceList places ={places} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ places }) => {
  const getPlacesByFilter = makeGetPlacesByFilter();
  return {
    isLoading: places.isLoading,
    places : getPlacesByFilter(places),
    filter : places.filter
  }
};

export default connect(
  mapStateToProps, {
    loadPlaces,
    setPlaceFilter,
    resetPlaceFilter
  }
) (PlaceTop);