import React from 'react';
import Border from '../../components/ui/content/bordered_content';
import { Row, Col } from 'reactstrap';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import PostContextMenu from '../../components/post/post_context_menu';
import { reduxForm } from 'redux-form';
import { required } from "../../utils/valdiators";

const PhotoEditForm = ({
    reset,
    handleSubmit,
    onCancel,
    onSubmit,
}) => (
    <div>
        <PostContextMenu
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
            onCancel={onCancel}
        />

        <Border>
            <form>
                <Row>
                    <Col>
                        <FormInput
                            messageId={'potw.title'}
                            defaultMessage={'Photo title'}
                            name={'title'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormInput
                            messageId={'potw.description'}
                            defaultMessage={'Short Description'}
                            name={'description'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormFileUpload
                            name={'photoFile'}
                            validate={[required]}
                        />
                    </Col>
                </Row>
            </form>
        </Border>
    </div>
);

export default reduxForm({ form: 'potw' })(PhotoEditForm);

