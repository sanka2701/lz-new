import React, {Component} from 'react';
import {Row, Col, Button, Collapse} from 'reactstrap';
import {required} from '../../utils/valdiators';
import MapEditor from '../map/map_editor';
import FormInput from '../../components/ui/fields/form/form_input';
import PlaceAutocomplete from './place_autocomplete';

const PlaceEditForm = ({formName, currentPlace}) => (
	<React.Fragment>
		<Row style={{marginTop: '20px', marginBottom: '10px'}}>
			<Col sm="12">
				<PlaceAutocomplete formName={formName}/>
			</Col>
		</Row>

		<Row style={{marginTop: '10px', marginBottom: '10px'}}>
			<Col sm="12">
				<FormInput
					messageId={'places.address'}
					defaultMessage={'Address'}
					name={'address'}
					validate={[required]}
				/>
			</Col>
		</Row>

		<Row style={{marginTop: '10px', marginBottom: '10px'}}>
			<Col sm="6">
				<FormInput
					messageId={'places.lat'}
					defaultMessage={'Latitude'}
					name={'lat'}
					validate={[required]}
					disabled={true}
				/>
			</Col>
			<Col sm="6">
				<FormInput
					messageId={'places.lon'}
					defaultMessage={'Longitude'}
					name={'lon'}
					validate={[required]}
					disabled={true}
				/>
			</Col>
		</Row>

		<MapEditor
			formName={formName}
			selectedPlace={currentPlace}
		/>
	</React.Fragment>
);

export default PlaceEditForm;
