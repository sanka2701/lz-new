import React from 'react';
import { connect } from 'react-redux';
import PlaceFilter from '../../components/place/place_filter';
import {
  Row,
  Col,
  Input} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import { loadPlaces } from '../../actions';

class UserTop extends React.Component {
  componentDidMount() {
  }

  onFilterChanged = (filterAttributes) => {
    debugger;
  };

  /**
   * for drawing
   * https://developers.google.com/maps/documentation/javascript/examples/drawing-tools
   * https://developers.google.com/maps/documentation/javascript/examples/circle-simple
   **/

  render = () => {
    return (
      <Row>
        <BorderCol sm={12}>
          <PlaceFilter onPlaceFilterChanged={this.onFilterChanged} />
          ahoj
        </BorderCol>
      </Row>
    )
  }
}

const mapStateToProps = ({ tags }) => {
  return {
    isLoading: tags.isLoading,
    tags : tags.byId
  }
};

export default connect( mapStateToProps, { loadPlaces }) (UserTop);