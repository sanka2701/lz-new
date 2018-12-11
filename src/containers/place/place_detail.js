import React from 'react';
import { connect } from 'react-redux';
import { loadPlaceById } from '../../actions';
import PostContextMenu from '../../components/post/post_context_menu';
import PlaceDetailView from "../../components/place/place_detail_view";

class PlaceDetail extends React.Component {

  componentDidMount() {
    const { placeId } = this.props.match.params;
    !this.props.place && this.props.loadPlaceById(placeId);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onEdit = () => {
    // todo: redirect
  };

  onDelete = () => {
    // todo: confirm message and delete
  };

  //todo: loading animation
  render = () => {
    const { place } = this.props;

    if (!place) {
      return (<div/>)
    }

    return (
      <React.Fragment>
        <PostContextMenu
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />
        <PlaceDetailView place={place} />
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