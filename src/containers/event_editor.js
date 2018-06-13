import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';

import PlaceHandler from './place_handler';
import EventDateEditor from '../components/event_date_editor';
import CKEditor from '../components/external/ck_editor';
import FileUploader from '../components/file_uploader';

import imgSrcExtract from '../utils/img_src_extract';

import axios from 'axios';

class EventEditor extends Component{

    onSubmit(values) {
        debugger;
    }

    createElementFromHTML(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div;
    }

    test(){
        const htmlContent = this.createElementFromHTML(this.props.eventContent);
        const imgsSrcs  = imgSrcExtract(htmlContent);

        const imgs = [];

        axios.get(imgsSrcs[0])
            .then(response => {
                const file = response.data;

                let data = new FormData();
                data.append('image', file, file.name);

                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                //todo: refactor, fix (returns http error 400)
                axios.post('http://localhost:8080/files/upload', data, config)
                    .then(request => {
                        debugger;
                    }).catch(err => {
                        debugger;
                    })

                // imgs.push(response.data);
            })
            .catch(err => {
                debugger;
            });

    }

    renderCKEditor = ({input: {onChange}}) => {
        const onContentChange = (event) => {
            onChange(event.editor.getData());
        };

        return (<CKEditor events={{
            change : onContentChange
        }} />
        )
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <Container>
                    {/*<Field name="firstName" component="input" type="text" placeholder="First Name"/>*/}
                    {/*<FileUploader />*/}
                    <EventDateEditor />
                    <PlaceHandler change={this.props.change}/>

                    <button type="submit" >Submit</button>

                    <button type="button" onClick={this.test.bind(this)}>test</button>
                    <Row>
                        <Col>
                            <Field
                                name={'content'}
                                component={this.renderCKEditor}
                            />
                        </Col>
                    </Row>
                </Container>
            </form>
        )
    }
}

function validate(values) {
    const errors = {};
    return errors;
}

const selector = formValueSelector('create_event');

function mapStateToProps(state) {
    return {
        // todo: connect to redux, this is just for testing initial form values
        initialValues: {
            time: {
                startDay: Date.now()
            }
            ,
            place: {
                label: 'Liptovsky Hradok',
                lat: '49.09725059408648',
                lon: '19.625701904296875'
            }
        },
        eventContent: selector(state, 'content')
    }
}

export default compose(
    connect(mapStateToProps, {}),
    reduxForm({form: 'create_event', validate})
)(EventEditor);