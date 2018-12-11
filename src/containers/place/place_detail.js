import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadPlaceById } from '../../actions';

class PlaceDetail extends React.Component {

  componentDidMount() {
    const { placeId } = this.props.match.params;
    !this.props.place && this.props.loadPlaceById(placeId);

    // this.onEdit = this.onEdit.bind(this);
    // this.onApprove = this.onApprove.bind(this);
  }

  render = () => {
    const { place } = this.props;

    return (
      <React.Fragment>
        nazdar {place && place.label}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ places, auth }, ownProps) => {
  const { placeId } = ownProps.match.params;
  return {
    place: places.byId[placeId],
    currentUser: auth.user
  }
};

export default connect(mapStateToProps, { loadPlaceById })(PlaceDetail);