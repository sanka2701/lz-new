import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Border from '../../components/ui/content/bordered_content';
const EventFilter = ({test}) => {
    return (
        <Row>
            <Col>
                <Border>
                    {test}
                </Border>
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

