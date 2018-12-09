import React from 'react';
import { connect } from 'react-redux';
import PlaceFilter from '../../components/place/place_filter';
import PlaceList from '../../components/place/place_list';
import {
  Row,
  Col,
  Input} from 'reactstrap';
import { loadPlaces } from '../../actions';

class PlaceTop extends React.Component {
  constructor(props){
    super(props);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.state = {
      filter: {
        center: {
          lat: 49.0811,
          lon: 19.6192,
        },
        radius: 1700,
      }
    }
  }

  componentDidMount() {
    this.props.loadPlaces();
  }

  onFilterChanged = (filter) => {
    debugger;
    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        ...filter
      }
    }))
  };

  /**
   * for drawing
   * https://developers.google.com/maps/documentation/javascript/examples/drawing-tools
   * https://developers.google.com/maps/documentation/javascript/examples/circle-simple
   **/

  render = () => {
    const { places } = this.props;

    return (
      <Row>
        <PlaceFilter filter={this.state.filter} onPlaceFilterChanged={this.onFilterChanged} />
        {/*<PlaceList places ={places} />*/}
      </Row>
    )
  }
}

const mapStateToProps = ({ places }) => {
  return {
    isLoading: places.isLoading,
    places : places.byId
  }
};

export default connect( mapStateToProps, { loadPlaces }) (PlaceTop);