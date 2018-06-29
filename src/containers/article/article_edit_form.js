import React from 'react';
import { FormattedMessage } from 'react-intl';
import { reduxForm } from "redux-form";
import { required } from "../../utils/valdiators";
import { Row, Col, Button } from 'reactstrap';
import FormInput from '../../components/ui/fields/form_input';
import FormFileUpload from '../../components/ui/fields/form_file_upload';
import FormContentEditor from '../../components/ui/fields/form_content_editor';

//todo: extract first row to some separate file
const ArticleEditForm = ({ onCancel, reset, onSubmit, ...props}) => (
    <form onSubmit={props.handleSubmit(onSubmit)}>
        <Row style={{textAlign: 'center'}}>
            <Col>
                <Button type='submit' color='success' >
                    <FormattedMessage id={'general.submitButton'} defaultMessage='Submit'/>
                </Button>
            </Col>
            <Col>
                <Button type='button' color='warning' onClick={props.reset} >
                    <FormattedMessage id={'general.resetButton'} defaultMessage='Reset'/>
                </Button>
            </Col>
            <Col>
                <Button type='button' color='danger' onClick={onCancel} >
                    <FormattedMessage id={'general.cancelButton'} defaultMessage='Cancel'/>
                </Button>
            </Col>
        </Row>

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
);

export default reduxForm({form: 'create_article'})(ArticleEditForm);