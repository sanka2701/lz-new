import React from 'react';
import { Row, Col } from 'reactstrap';
import { required } from '../utils/valdiators';
import { timeToMilliseconds } from '../utils/helpers';

import FormDateTimePicker from './ui/fields/form_date_time_picker';
import FormDropdownList from './ui/fields/form_dropdown_list';

//todo: move this configuration to more suitable place and support locale switch
import momentLocaliser from 'react-widgets-moment';
import moment from 'moment'
import 'moment/locale/sk';
import 'moment/locale/pl';
import 'moment/locale/en-gb';

console.log('locales', moment.locales());
console.log('slovak', moment.locale('sk'));

moment.updateLocale('sk');
momentLocaliser(moment);

const PlaceDateEditor = () => {
    const getTimeSteps = () => {
        const timeOptions = [];
        for (let hours = 0; hours < 24; hours++) {
            for (let minutes = 0; minutes < 60; minutes+=15) {
                timeOptions.push({
                    label: ("0" + hours).slice(-2) + ':' + ("0" + minutes).slice(-2),
                    millis: timeToMilliseconds(hours, minutes)
                })
            }
        }
        return timeOptions;
    };

    return (
        <div>
            <Row style={{marginTop: '20px', marginBottom: '10px'}}>
                <Col sm='6'>
                    <FormDateTimePicker
                        name="time.startDay"
                        validate={[required]}
                        messageId={'event.startDay'}
                        defaultMessage='Select start day'
                    />
                </Col>

                <Col sm='6'>
                    <FormDateTimePicker
                        name="time.endDay"
                        validate={[required]}
                        messageId={'event.endDay'}
                        defaultMessage='Select end day'
                    />
                </Col>
            </Row>

            <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                <Col>
                    <FormDropdownList
                        name='time.startTime'
                        data={getTimeSteps()}
                        validate={[required]}
                        messageId={'event.startTime'}
                        defaultMessage='Select start time'
                    />
                </Col>
                <Col>
                    <FormDropdownList
                        name='time.endTime'
                        data={getTimeSteps()}
                        validate={[required]}
                        messageId={'event.endTime'}
                        defaultMessage='Select end time'
                    />
                </Col>
            </Row>
        </div>
    )
};

export default PlaceDateEditor;