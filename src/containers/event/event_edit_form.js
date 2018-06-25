import React from 'react';
import { reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { required } from "../../utils/valdiators";
import { Container, Row, Col, Button } from 'reactstrap';
import EventDateEditor from '../../components/event_date_editor';
import PlaceHandler from '../place/place_handler';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';

class EventEditForm extends React.Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.props.onSubmit)}>
                <Container>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <Button type='submit' color='success' >
                                <FormattedMessage id={'event.submitButton'} defaultMessage='Submit event'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='warning' onClick={() => this.props.reset()}>
                                <FormattedMessage id={'event.resetButton'} defaultMessage='Reset form'/>
                            </Button>
                        </Col>
                        <Col>
                            <Button type='button' color='danger' >
                                <FormattedMessage id={'event.cancelButton'} defaultMessage='Cancel'/>
                            </Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormInput
                                messageId={'event.eventTitle'}
                                defaultMessage={'Event title'}
                                name={'eventTitle'}
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
        if(values.time.startDay &&
            values.time.endDay &&
            values.time.startDay > values.time.endDay
        ) {
            debugger;
            errors.time={};
            errors.time.startDay = 'error.time.startDateBeforeEnd';
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