import React from 'react';
import { reduxForm } from 'redux-form';
import { required } from "../../utils/valdiators";
import { Container, Row, Col } from 'reactstrap';
import EventDateEditor from '../../components/event/event_date_editor';
import PlaceHandler from '../place/place_handler';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';
import PostContextMenu from '../../components/post/post_context_menu';
import Border from '../../components/ui/content/bordered_content';

const EventEditForm = ({
    handleSubmit,
    editMode,
    change,
    reset,
    onCancel,
    onSubmit,
    onApprove,
}) => (
    <div>
        <Container>
            <PostContextMenu
                onSubmit={handleSubmit(onSubmit)}
                onReset={reset}
                onCancel={onCancel}
                onApprove={editMode ? onApprove : null}
            />

            <Border>
                <form>
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

                    <PlaceHandler change={change} />

                    <Row>
                        <Col>
                            <FormContentEditor
                                name={'content'}
                                validate={[required]}
                            />
                        </Col>
                    </Row>
                </form>
            </Border>

            <PostContextMenu
                onSubmit={handleSubmit(onSubmit)}
                onReset={reset}
                onCancel={onCancel}
                onApprove={editMode ? onApprove : null}
            />
        </Container>
    </div>
);

function validate(values) {
    const errors = {};
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
        errors.place={};
        errors.place.label='error.field.required'
    }

    return errors;
}

export default reduxForm({form: 'create_event', validate})(EventEditForm);