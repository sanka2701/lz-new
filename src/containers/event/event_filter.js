import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
const EventFilter = ({test}) => {
    return (
        <Row>
            <Col>
                <BorderCol>
                    {test}
                </BorderCol>
            </Col>
        </Row>
    )
};

const mapStateToProps = (state) => {
    return {
        test: 'this will be an event filter'
    }
};

export default  connect( mapStateToProps )(EventFilter);

