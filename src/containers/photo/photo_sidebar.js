import React from 'react';
import { connect } from 'react-redux';
import { loadAllPhotos } from '../../actions';
import { makeGetCurrentPotw } from '../../filters/photo_current_filter';

//todo: style the component and display info
class PhotoSidebar extends React.Component {
    componentDidMount() {
        this.props.loadAllPhotos();
    }

    render() {
        const { photo } = this.props;

        if(!photo) {
            return (<div></div>);
        }

        return (
            <div>
                <img src={photo.photoUrl} style={{maxWidth: '100%'}} />
            </div>
        )
    }
}

const mapStateToProps = ({ photos }) => {
    const getCurrentPotw = makeGetCurrentPotw();
    return {
        photo: getCurrentPotw(photos)
    }
};

export default connect(mapStateToProps, { loadAllPhotos } )(PhotoSidebar)