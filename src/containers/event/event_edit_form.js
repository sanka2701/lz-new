import React from 'react';
import { reduxForm } from 'redux-form';
import { required } from "../../utils/valdiators";
import { Container, Row, Col, Button } from 'reactstrap';
import EventDateEditor from '../../components/event/event_date_editor';
import PlaceHandler from '../place/place_handler';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';
import PostContextMenu from '../../components/post/post_context_menu';

class EventEditForm extends React.Component {
    render() {
        const { handleSubmit, onSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <PostContextMenu
                        onSubmit={() => {}}
                        onReset={this.props.reset}
                        onCancel={this.props.onCancel}
                        onApprove={this.props.editMode ? this.props.onApprove : null}
                    />

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

                    <PostContextMenu
                        onSubmit={() => {}}
                        onReset={this.props.reset}
                        onCancel={this.props.onCancel}
                        onApprove={this.props.editMode ? this.props.onApprove : null}
                    />
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