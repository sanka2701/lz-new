import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Label } from 'reactstrap';

const withLabel = (WrappedComponent) => ({ messageId, defaultMessage, ...props }) => {
    // debugger;
    return (
        <Row>
            <Col>
                <Label>
                    <FormattedMessage id={messageId} defaultMessage={defaultMessage}/>
                </Label>
                <WrappedComponent {...props} />
            </Col>
        </Row>
    );
};

export default withLabel;