import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

const Add =({ onClick, messageId }) => (
  <React.Fragment>
    <span id='addIcon' onClick={onClick}>
      <FaPlusCircle className={style.icon} />
    </span>
    <UncontrolledTooltip target='addIcon'>
      <FormattedMessage
        placement={'bottom'}
        id={messageId}
        defaultMessage='Create New' />
    </UncontrolledTooltip >
  </React.Fragment>
);

export default Add;