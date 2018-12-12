import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PlaceEditForm from './place_edit_form';
import BorderCol from '../../components/ui/content/bordered_content';
import { reduxForm, FormSection } from 'redux-form';
import {Button} from 'reactstrap';
import {postPlace} from "../../actions";

//todo: finish submiting
class PlaceEditor extends React.Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Ahoj')
  }

  onSubmit({place}) {
    const {postPlace} = this.props;
		postPlace(place);
  }

  render() {
		const {place} = this.props;

    return (
      <React.Fragment>
        <BorderCol>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <FormSection name='place'>
              <PlaceEditForm
                formName='create_place'
                initialValues={place}
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
  return {
    place: places.byId[placeId]
  }
};

export default compose(
  reduxForm({form: 'create_place'}),
  connect(mapStateToProps, {postPlace})
)(PlaceEditor);