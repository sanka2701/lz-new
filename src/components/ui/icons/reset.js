import React from 'react';
import { FaRedo } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

const Add =({ onClick, messageId }) => (
  <React.Fragment>
    <span id='resetIcon' onClick={onClick}>
      <FaRedo className={`${style.icon} ${style.light}`} />
    </span>{' '}
    <UncontrolledTooltip target='resetIcon'>
      <FormattedMessage
        placement={'bottom'}
        id={'icon.tooltip.resetPlaceFilter'}
        defaultMessage='Create New' />
    </UncontrolledTooltip >
  </React.Fragment>
);

export default Add;