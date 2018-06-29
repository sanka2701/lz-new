import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { required } from "../../utils/valdiators";
import { Container, Row, Col, Button } from 'reactstrap';
import EventDateEditor from '../../components/event/event_date_editor';
import PlaceHandler from '../place/place_handler';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';

class EventEditForm extends React.Component {
    render() {
        const { handleSubmit, onSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <Button type='submit' color='success' >
                                <FormattedMessage id={'general.submitButton'} defaultMessage='Submit'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='warning' onClick={this.props.reset} >
                                <FormattedMessage id={'general.resetButton'} defaultMessage='Reset'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='danger' onClick={this.props.onCancel} >
                                <FormattedMessage id={'general.cancelButton'} defaultMessage='Cancel'/>
                            </Button>
                        </Col>
                        {this.props.editMode && (
                            <Col>
                                <Button type='button' color='info' onClick={this.props.onApprove} >
                                    <FormattedMessage id={'event.approveButton'} defaultMessage='Approve'/>
                                </Button>
                            </Col>
                        )}
                    </Row>

                    <Row>
                        <Col>
                            <FormInput
                                messageId={'event.eventTitle'}
                                defaultMessage={'Event title'}
                                name={'title'}
                                validate={[required]}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col sm='4'>
                            <FormFileUpload
                                name={'thumbnail'}
                                validate={[required]}
                            />
                        </Col>
                        <Col sm='8' className={"align-self-center"}>
                            <EventDateEditor />
                        </Col>
                    </Row>

                    <PlaceHandler change={this.props.change} />

                    <Row>
                        <Col>
                            <FormContentEditor
                                name={'content'}
                                validate={[required]}
                            />
                        </Col>
                    </Row>
                </Container>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
// debugger;
    if(values.time) {
        if(values.time.startDate &&
            values.time.endDate &&
            values.time.startDate > values.time.endDate
        ) {
            debugger;
            errors.time={};
            errors.time.startDate = 'error.time.startDateBeforeEnd';
        }
    }

    if(!values.place || !values.place.label) {
        // debugger;
        errors.place={};
        errors.place.label='error.field.required'
    }

    return errors;
}

export default reduxForm({form: 'create_event', validate})(EventEditForm);