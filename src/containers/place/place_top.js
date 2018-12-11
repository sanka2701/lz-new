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
          <Button color="primary" onClick={() => this.setState({ mapShown: !mapShown })}>
            Show/Hide
          </Button>
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