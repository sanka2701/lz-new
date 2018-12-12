import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PlaceHandler from '../../containers/place/place_handler';
import BorderCol from '../../components/ui/content/bordered_content';
import { reduxForm, FormSection } from 'redux-form';
import {Button} from 'reactstrap';

//todo: finish submiting
class PlaceEditor extends React.Component{

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      place: {
        address:'hjg',
        lat:'',
        lon:'',
        label:'tmp'
      }
    }
  }

  componentDidMount() {
    console.log('Ahoj')
  }

  onSubmit(place) {
    debugger;
  }

  render() {


    return (
      <React.Fragment>
        <BorderCol>
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <FormSection name='place'>
              <PlaceHandler
                formName='create_place'
                initialValues={this.state.place}
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
}

export default compose(
  reduxForm({form: 'create_place'}),
  connect(mapStateToProps, {})
)(PlaceEditor);