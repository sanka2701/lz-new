import React from 'react';
import PropTypes from "prop-types";
import DOMPurify from 'dompurify';

import './post_content.css';

const PostContent = ({content}) => {
    return (
        <div>
            <div
                className={'__lz_ck_content__'}
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}} />
            />
        </div>
    )
};

PostContent.propTypes = {
    content: PropTypes.string.isRequired
};

export default PostContent;

