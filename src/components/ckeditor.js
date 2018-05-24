import React, { Component } from 'react';
// import CKEDITOR from '../assets/ckeditor/ckeditor';
const loadScript = require('load-script');

export default class CKEditor extends Component {
    componentDidMount() {
        loadScript('assets/ckeditor/ckeditor.js', function (err, script) {
            if (err) {
                console.log('EH!');
            }
            else {
                console.log('JO!', script);
                window.CKEDITOR.replace("editor");
                // script.replace("editor");
            }
        });

        // window.CKEDITOR.replace("editor");
    }

    render() {
        return (
            <textarea name="editor" cols="100" rows="6"/>
        )
    }
}