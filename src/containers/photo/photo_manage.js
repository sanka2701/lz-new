import React from 'react';
import { connect } from 'react-redux';
import PhotoEditForm from './photo_edit_form';
import { postPhoto, updatePhoto, loadPhotoById } from '../../actions';

class PhotoManage extends React.Component {

    onCancel = () => {

    };

    onSubmit = (values) => {
        this.props.postPhoto(values);
    };

    render = () => {
        return (
            <div>
                <PhotoEditForm
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ photos }) => {
    return {
        photos: photos
    }
};

export default connect(mapStateToProps, { postPhoto, updatePhoto, loadPhotoById })(PhotoManage);
