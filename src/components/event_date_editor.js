import React from 'react';
import { Row, Col, Label, FormGroup } from 'reactstrap';
import { DropdownList, DateTimePicker } from 'react-widgets';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import ErrorSlider from './ui/error_slider';
import { required } from '../utils/valdiators';
import { timeToMilliseconds } from '../utils/helpers';

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


const renderDateTimePicker = ({ input: { onChange, value }, meta}) => {
    //todo: after value edit the touched attribute in meta is not changed
    return (
    <div>
        <DateTimePicker
            // onBlur={(e) => {DateTimePicker.onBlur(e)}}
            onChange={(val) => { val && onChange(val.getTime())}}
            format="DD MMM YYYY"
            time={false}
            value={!value ? null : new Date(value)}
        />
        <ErrorSlider
            errorCode={meta.error}
            // displayed={meta.touched && meta.error}
            displayed={!!meta.error}
        />
    </div>
)};

const renderDropdownList = ({input, meta, data}) => (
    //todo: find a way to extract localized message for emptyFiles
    //todo: search by contains and not strict match
    //todo: selecting value and the clicking outside of proposed list removes the previously selected value and sets it to empty
    <div>
        <DropdownList
            {...input}
            filter
            textField="label"
            messages={{emptyFilter:'No options found'}}
            data={data}
        />
        <ErrorSlider
            errorCode={meta.error}
            displayed={meta.touched && meta.error}
        />
    </div>
);

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
                    <FormGroup>
                        <Label>
                            <FormattedMessage id={'event.startDay'} defaultMessage='Select start day'/>
                        </Label>
                        <Field
                            name="time.startDay"
                            component={renderDateTimePicker}
                            // validate={[required]}
                        />
                    </FormGroup>
                </Col>

                <Col>
                    <FormGroup>
                        <Label>
                            <FormattedMessage id={'event.endDay'} defaultMessage='Select end day'/>
                        </Label>
                        <Field
                            name="time.endDay"
                            component={renderDateTimePicker}
                            // validate={[required]}
                        />
                    </FormGroup>
                </Col>
            </Row>

            <Row style={{marginTop: '10px', marginBottom: '10px'}}>
                <Col>
                        <Label>
                        <FormattedMessage id={'event.startTime'} defaultMessage='Select start time'/>
                    </Label>
                    <Field
                        name='time.startTime'
                        component={renderDropdownList}
                        data={getTimeSteps()}
                        validate={[required]}
                    />
                </Col>
                <Col>
                    <Label>
                        <FormattedMessage id={'event.endTime'} defaultMessage='Select end time'/>
                    </Label>
                    <Field
                        name='time.endTime'
                        component={renderDropdownList}
                        data={getTimeSteps()}
                        validate={[required]}
                    />
                </Col>
            </Row>
        </div>
    )
};

export default PlaceDateEditor;