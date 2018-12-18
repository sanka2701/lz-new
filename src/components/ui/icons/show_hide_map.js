import React from 'react';
import { FaMapMarked, FaMapMarkedAlt } from 'react-icons/fa';
import { UncontrolledTooltip  } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import style from './icon.module.css';

class ShowHideMap extends React.Component {
	constructor(props) {
		super(props);
		this.onIconClick = this.onIconClick.bind(this);
		//todo: enable state initializing from outside props
		this.state = {
			isShown: true
		}
	}

	onIconClick(event) {
		const { isShown } = this.state;
		const { onClick } = this.props;
		this.setState({ isShown: !isShown });
		onClick(event);
	}

	render() {
		const { isShown } = this.state;

		return (
			<React.Fragment>
			<span id='toogleIcon' onClick={this.onIconClick}>
				{
					isShown
						? (<FaMapMarkedAlt className={`${style.icon} ${style.dark}`}/>)
						: (<FaMapMarked className={`${style.icon} ${style.light}`}/>)
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

export default ShowHideMap;