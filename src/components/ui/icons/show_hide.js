import React from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

const ShowHide =({ onClick, isCrossed }) => (
  <React.Fragment>
    <span id='toogleIcon' onClick={onClick}>
      {
        isCrossed
          ? (<FaEyeSlash className={style.icon}/>)
          : (<FaEye className={style.icon}/>)
      }
    </span>
    <UncontrolledTooltip target='toogleIcon'>
      <FormattedMessage
        placement={'bottom'}
        id='icon.tooltip.showHide'
        defaultMessage='Show/hide map' />
    </UncontrolledTooltip>
  </React.Fragment>
);

export default ShowHide;