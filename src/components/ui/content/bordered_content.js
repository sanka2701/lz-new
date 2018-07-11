import React from 'react';
import PropTypes from "prop-types";
import { BORDER_ARTICLE, BORDER_EVENT, BORDER_SIDEBAR } from '../../../utils/constant';

import styles from './bordered_content.module.css';

const resolveColor = (type) => {
    switch (type) {
        case BORDER_ARTICLE:
            return '#ed52ad';
        case BORDER_EVENT:
            return '#008000';
        case BORDER_SIDEBAR:
            // return '#FEDA00';
        default:
            return '#1C1733';
    }
};

const Border = ({ children, type }) => (
    <div className={styles.card} style={{borderColor:resolveColor(type)}}>
        {children}
    </div>
);

Border.propTypes ={
    type: PropTypes.string
};

export default Border;