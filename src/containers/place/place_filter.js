import React from 'react';
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Input} from 'reactstrap';

const PlaceFilter = ({ onPlaceFilterChanged })  => (
    <Row>
      <Col sm={8}>
        <Input onChange={onPlaceFilterChanged} />
      </Col>
    </Row>
);

PlaceFilter.propTypes = {
  onPlaceFilterChanged: PropTypes.func.isRequired
};

export default PlaceFilter;