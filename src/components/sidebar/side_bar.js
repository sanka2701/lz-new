import React from 'react';
import Border from '../ui/content/bordered_content'
import { BORDER_SIDEBAR } from '../../utils/constant';

//todo: add content
export default (props) => (
    <div>
        <Border type={BORDER_SIDEBAR} >
            fotka tyzdna
        </Border>
        <Border type={BORDER_SIDEBAR} >
            nadchadzajuce udalosti
        </Border>
    </div>
);