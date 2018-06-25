import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl'

import * as styles from './event_row.css';

export default ({event}) => {
    return (
        <div>
            <Row>
                <Col>
                    <img src={event.thumbnail} className={styles.img}/>
                </Col>
                <Col>
                    { event.heading }
                </Col>
                <Col>
                    <Button tag={Link} to={`/events/${event.id}/${event.placeId}`}>
                        <FormattedMessage id='event.view' defaultMessage='View' />
                    </Button>
                </Col>
                <Col>
                    <Button tag={Link} to={`/eventsEdit/${event.id}/${event.placeId}`}>
                        <FormattedMessage id='event.edit' defaultMessage='Edit' />
                    </Button>
                </Col>
                {/*<Col>*/}
                    {/*<Button>*/}
                        {/*<FormattedMessage id='event.approve' defaultMessage='Approve' />*/}
                    {/*</Button>*/}
                {/*</Col>*/}
            </Row>
        </div>
    )
}