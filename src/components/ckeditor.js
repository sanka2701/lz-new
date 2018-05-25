import React, { Component } from 'react';
const loadScript = require('load-script');

export default class CKEditor extends Component {
    componentDidMount() {
        loadScript('assets/ckeditor/ckeditor.js', function (err, script) {
            if (err) {
                console.log('EH!');
            }
            else {
                console.log('JO!', script);
                window.CKEDITOR.replace("ckEditorAnchor");
            }
        });
    }

    render() {
        return (
            <textarea name="ckEditorAnchor"/>
        )
    }
}