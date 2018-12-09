import React from 'react';
import PropTypes from "prop-types";
import { Table } from 'reactstrap';
import { map } from 'lodash';
import { FormattedMessage } from 'react-intl';

import BorderCol from '../ui/content/bordered_content';
import MapDisplay from '../../components/map/map_display';

const getTableRows = (places) => map(places, (place, index) => {
  return (
    <tr key={'tag-mng-' + place.id}>
      <th scope="row">
        {parseInt(index) + 1}
      </th>
      <td>
        <MapDisplay
          height={'150px'}
          width={'150px'}
          zoom={14}
          selectedPlace={place}
          animation={'NONE'}
          disableDefaultUI
        />
      </td>
      <td>
        {place.address}
      </td>
      <td>
        {place.label || '-' }
      </td>
    </tr>
  )
});

const PlaceList = ({ places }) => (
  <BorderCol>
    <Table responsive hover striped>
      <thead>
      <tr>
        <th>#</th>
        <th>
          <FormattedMessage id={'place.map'} defaultMessage={'Map'}/>
        </th>
        <th>
          <FormattedMessage id={'place.address'} defaultMessage={'Address'}/>
        </th>
        <th>
          <FormattedMessage id={'place.label'} defaultMessage={'Label'}/>
        </th>
      </tr>
      </thead>
      <tbody>
      { getTableRows(places) }
      </tbody>
    </Table>
  </BorderCol>
);

PlaceList.propTypes = {
  places: PropTypes.array.isRequired
};

PlaceList.defaultProps = {
  places: []
};

export default PlaceList;