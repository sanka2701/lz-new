import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

const Add =({ onClick }) => (
  <React.Fragment>
    <span id='addIcon' onClick={onClick}>
      <FaPlusCircle className={style.icon} />
    </span>{' '}
    <UncontrolledTooltip target='addIcon'>
      <FormattedMessage
        placement={'bottom'}
        id={'icon.tooltip.createNewItem'}
        defaultMessage='Create New Item' />
    </UncontrolledTooltip >
  </React.Fragment>
);

export default Add;