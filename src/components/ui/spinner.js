import React from 'react';

import './spinner_styles.css';

export default function ({ errorCode, displayed }) {
    return(
        <div>
            <div id="img1" className="img spinning" />
            <div id="img2" className="img spinning" />
            <div id="img3" className="img spinning" />
            <div id="img4" className="img spinning" />
            <div id="img5" className="img spinning" />
        </div>
    )
}