import React from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

class ShowHide extends React.Component {
	constructor(props) {
		super(props);
		this.onIconClick = this.onIconClick.bind(this);
		this.state = {
			isCrossed: false
		}
	}

	onIconClick(event) {
		const { isCrossed } = this.state;
		const { onClick } = this.props;
		this.setState({ isCrossed: !isCrossed });
		onClick(event);
	}

	render() {
		const { isCrossed } = this.state;

		return (
			<React.Fragment>
			<span id='toogleIcon' onClick={this.onIconClick}>
				{
					isCrossed
						? (<FaEyeSlash className={style.icon}/>)
						: (<FaEye className={style.icon}/>)
				}
			</span>{' '}
				<UncontrolledTooltip target='toogleIcon'>
					<FormattedMessage
						placement={'bottom'}
						id='icon.tooltip.showHide'
						defaultMessage='Show/hide' />
				</UncontrolledTooltip>
			</React.Fragment>
		)
	}
}

export default ShowHide;