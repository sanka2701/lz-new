import React from 'react';
import { FormattedMessage } from 'react-intl';
import { reduxForm } from "redux-form";
import { required } from "../../utils/valdiators";
import { Row, Col, Button } from 'reactstrap';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';
import PostContextMenu from '../../components/post/post_context_menu';

//todo: extract first row to some separate file
const ArticleEditForm = ({ onCancel, reset, onSubmit, ...props}) => (
    <form onSubmit={props.handleSubmit(onSubmit)}>
        <PostContextMenu
            onSubmit={() => {}}
            onReset={reset}
            onCancel={onCancel}
        />

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

        <PostContextMenu
            onSubmit={() => {}}
            onReset={reset}
            onCancel={onCancel}
        />
    </form>
);

export default reduxForm({form: 'create_article'})(ArticleEditForm);