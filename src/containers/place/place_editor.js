import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PlaceEditForm from '../../components/place/place_edit_form';
import BorderCol from '../../components/ui/content/bordered_content';
import { reduxForm, FormSection } from 'redux-form';
import {Button} from 'reactstrap';
import {postPlace} from "../../actions";

//todo: finish submitting
class PlaceEditor extends React.Component{
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  	//todo: load place by id of not existent
  }

  onSubmit({place}) {
    const {postPlace} = this.props;
		postPlace(place);
  }

  render() {
		const {handleSubmit} = this.props;
		//todo: not showing the place details in edit mode
    return (
      <React.Fragment>
        <BorderCol>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <FormSection name='place'>
              <PlaceEditForm
                formName='create_place'
              />
              <Button>
                submit
              </Button>
            </FormSection>
          </form>
        </BorderCol>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({places}, ownProps) => {
  const { placeId } = ownProps.match.params;
  const editedPlace = places.byId[placeId];
  return {
    initialValues: {place: editedPlace}
  }
};

export default compose(
	connect(mapStateToProps, { postPlace }),
  reduxForm({form: 'create_place'})
)(PlaceEditor);