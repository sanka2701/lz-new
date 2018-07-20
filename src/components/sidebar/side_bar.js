import React from 'react';
import { FormattedMessage } from 'react-intl'
import Border from '../ui/content/bordered_content'
import { BORDER_SIDEBAR } from '../../utils/constant';
import UpcomingEvents from '../../containers/event/event_upcoming';

//todo: add content
export default (props) => (
    <div>
        <Border type={BORDER_SIDEBAR} >
            fotka tyzdna
        </Border>
        <Border type={BORDER_SIDEBAR} >
            <h4>
                <FormattedMessage  id='side.upcomingEvents' defaultMessage='Upcoming Events' />
            </h4>
            <UpcomingEvents />
        </Border>
    </div>
);