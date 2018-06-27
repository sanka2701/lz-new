import React from 'react';
import PropTypes from "prop-types";
import DOMPurify from 'dompurify';

import styles from './post_context_menu.module.css';

const PostContextMenu = () => (
    <div className={styles.wrapper}>
        <div className={styles.dash}/>
    </div>
);

// PostContextMenu.propTypes = {
//     content: PropTypes.string.isRequired
// };

export default PostContextMenu;