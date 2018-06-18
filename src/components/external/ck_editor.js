import React, { Component } from 'react';
const loadScript = require('load-script');

const CKEDITOR_LIB_PATH = 'assets/ckeditor/ckeditor.js';

class CKEditor extends Component {
    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        loadScript(CKEDITOR_LIB_PATH, this.onLoad.bind(this));
    }

    onLoad() {
        if(!window.CKEDITOR) {
            console.error('Unable to load CKEditor');
            return;
        }

        this.editorInstance = window.CKEDITOR.replace(this.refs.ckEditorAnchor);

        for (const event in this.props.events) {
            const eventHandler = this.props.events[event];
            this.editorInstance.on(event, eventHandler);
        }
    }

    render() {
        return (
            <textarea ref='ckEditorAnchor' value={this.props.value} />
        )
    }
}

CKEditor.defaultProps = {
    value: '',
    events: {}
};

export default CKEditor;

// retrieve blob back from url
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'blob:http://localhost:3000/1195dc33-80f1-4a1b-9d43-e1f62f3c6d63', true);
// xhr.responseType = 'blob';
// xhr.onload = function(e) {
//     if (this.status == 200) {
//         var myBlob = this.response;
//         console.log('data', myBlob);
//         // myBlob is now the blob that the object URL pointed to.
//     }
// };
// xhr.send();