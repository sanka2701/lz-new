import React from 'react';
import { reduxForm } from "redux-form";
import { required } from "../../utils/valdiators";
import { Row, Col } from 'reactstrap';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';
import PostContextMenu from '../../components/post/post_context_menu';
import Border from '../../components/ui/content/bordered_content';

const ArticleEditForm = ({ onCancel, reset, onSubmit, handleSubmit }) => (
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
                            messageId={'Article.title'}
                            defaultMessage={'Event title'}
                            name={'title'}
                            validate={[required]}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormFileUpload
                            name={'thumbnail'}
                            validate={[required]}
                        />
                    </Col>
                </Row>

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
        />
    </div>
);

export default reduxForm({form: 'create_article'})(ArticleEditForm);