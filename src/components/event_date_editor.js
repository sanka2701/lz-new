import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Label } from 'reactstrap';
import { DropdownList, DateTimePicker } from 'react-widgets';
import { FormattedMessage } from 'react-intl';

import momentLocaliser from 'react-widgets-moment';
import moment from 'moment'
import 'moment/locale/sk';
import 'moment/locale/pl';
import 'moment/locale/en-gb';

console.log('locales', moment.locales());
console.log('slovak', moment.locale('sk'));

moment.updateLocale('sk');
momentLocaliser(moment);

const PlaceDateEditor = (props) => {
    let value;

    const onChange = (event) => {
        console.log('Date CHanged', event.getTime());
    };

    const getTimeSteps = () => {
        return [
            {text: '00:00'},
            {text: '00:15'},
            {text: '00:30'},
            {text: '00:45'},
            {text: '01:00'}
        ]
    };

    return (
        <div>
            <Row style={{marginTop: '20px', marginBottom: '10px'}}>
                <Col>
                    <Label>
                        <FormattedMessage id={'event.startDay'} defaultMessage='Select start day'/>
                    </Label>
                </Col>
                <Col>
                    <DateTimePicker
                        onChange={onChange}
                        format="DD MMM YYYY"
                        time={false}
                        value={!value ? null : new Date(value)}
                    />
                </Col>

                <Col>
                    <Label>
                        <FormattedMessage id={'event.endDay'} defaultMessage='Select end day'/>
                    </Label>
                </Col>
                <Col>
                    <DateTimePicker
                        onChange={onChange}
                        format="DD MMM YYYY"
                        time={false}
                        value={!value ? null : new Date(value)}
                    />
                </Col>
            </Row>

            <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                <Col>
                    <Label>
                        <FormattedMessage id={'event.startTime'} defaultMessage='Select start time'/>
                    </Label>
                </Col>
                <Col>
                    <DropdownList
                        filter
                        textField="text"
                        messages={{emptyFilter:'naser si'}}
                        data={getTimeSteps()}
                    />
                </Col>
                <Col>
                    <Label>
                        <FormattedMessage id={'event.endTime'} defaultMessage='Select end time'/>
                    </Label>
                </Col>
                <Col>
                    <DropdownList
                        filter
                        textField="text"
                        messages={{emptyFilter:'naser si'}}
                        data={getTimeSteps()}
                    />
                </Col>
            </Row>
        </div>
    )
};

PlaceDateEditor.propTypes = {
    title: PropTypes.string,
    coordinates : PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    })
};

PlaceDateEditor.defaultProps = {
    title: '',
    coordinates: {}
};

export default PlaceDateEditor;