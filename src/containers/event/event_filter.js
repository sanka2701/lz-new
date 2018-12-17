import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import {resetEventFilter, setEventFilter} from "../../actions";
import PlaceFilter from "../../components/place/place_filter";

const EventFilter = ({filter, setEventFilter}) => {

	const placeFilterChanged = (place) => {
		setEventFilter({
			place: {
				...filter.place,
				...place
			}
		});
	};

	return (
		<BorderCol sm={12}>
			<PlaceFilter onPlaceFilterChanged={placeFilterChanged} filter={filter.place}/>
		</BorderCol>
	)
};

const mapStateToProps = ({ events: { filter } }) => {
	return {
		filter
	}
};

export default connect(mapStateToProps, {setEventFilter, resetEventFilter})(EventFilter);

