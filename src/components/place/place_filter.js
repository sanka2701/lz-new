import React from 'react';
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Label,
  Input,
Button} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import { FormattedMessage } from 'react-intl';
import MapFilter from '../../components/map/map_filter';

const PlaceFilter = ({ onPlaceFilterChanged, filter })  => (
  <BorderCol sm={12}>
    <Row>
      <Col sm={12}>
        {/*<Label>*/}
          {/*<FormattedMessage id={'place.label'} defaultMessage={'Test input'}/>*/}
        {/*</Label>*/}
        {/*<Input onChange={onPlaceFilterChanged} />*/}

        <MapFilter
          selectedCircle={filter}
          onCircleSet={(circle) => {
            onPlaceFilterChanged(circle)
          }}
        />
        <Button color="danger" onClick={() => onPlaceFilterChanged({radius: 3000})}>Change radius</Button>
      </Col>
    </Row>
  </BorderCol>
);

PlaceFilter.propTypes = {
  onPlaceFilterChanged: PropTypes.func.isRequired
};

export default PlaceFilter;