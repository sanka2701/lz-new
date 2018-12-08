import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl'
import PropTypes from "prop-types";
import BorderCol from '../ui/content/bordered_content';

import styles from './post_context_menu.module.css';

const renderButton = ({type, color, message, defaultMessage, callback}) => (
    <Col>
        <Button type={type} color={color} onClick={callback}>
            <FormattedMessage id={`general.${message}`} defaultMessage={defaultMessage} />
        </Button>
    </Col>
);

const PostContextMenu = ({onSubmit, onReset, onEdit, onCancel, onApprove}) => (
    <BorderCol>
        <Row className={styles.wrapper}>
        { onSubmit  && renderButton({type:'submit', color:'success', message:'submit', defaultMessage:'Submit', callback:onSubmit}) }
        { onReset   && renderButton({type:'button', color:'warning', message:'reset', defaultMessage:'Reset', callback:onReset}) }
        { onEdit    && renderButton({type:'button', color:'warning', message:'edit', defaultMessage:'Edit', callback:onEdit}) }
        { onCancel  && renderButton({type:'button', color:'danger', message:'cancel', defaultMessage:'Cancel', callback:onCancel}) }
        { onApprove && renderButton({type:'button', color:'info', message:'approve', defaultMessage:'Approve', callback:onApprove}) }
        </Row>
    </BorderCol>
);

PostContextMenu.defaultProps = {
    onSubmit : null,
    onReset  : null,
    onEdit   : null,
    onCancel : null,
    onApprove: null
};

PostContextMenu.propTypes = {
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onApprove: PropTypes.func
};

export default PostContextMenu;