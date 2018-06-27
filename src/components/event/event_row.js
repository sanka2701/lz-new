import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl'

import styles from './event_row.module.css';

export default ({event}) => {
    return (
        <Row className={styles.eventRow} >
            <Col sm='2' >
                <img src={event.thumbnail} className={`${styles.img}`} />
            </Col>
            <Col sm='4' className={styles.title}>
                { event.title }
            </Col>
            <Col sm='2' >
                <Button
                    color='info'
                    className={styles.button}
                    tag={Link}
                    to={`/events/${event.id}/${event.placeId}`}
                >
                    <FormattedMessage id='event.viewButton' defaultMessage='View' />
                </Button>
            </Col>
            <Col sm='2' >
                <Button
                    color='warning'
                    className={styles.button}
                    tag={Link}
                    to={`/events/edit/${event.id}/${event.placeId}`}
                >
                    <FormattedMessage id='event.editButton' defaultMessage='Edit' />
                </Button>
            </Col>
            <Col sm='2' >
                <Button
                    color='success'
                    className={styles.button}
                >
                    <FormattedMessage id={'event.approveButton'} defaultMessage='Approve' />
                </Button>
            </Col>
        </Row>
    )
}