import React from 'react';
import {
    Row,
    Col,
    Input} from 'reactstrap';
import BorderCol from '../../components/ui/content/bordered_content';
import { connect } from 'react-redux';
import { setUserFilter } from '../../actions';
import {
  INPUT_SEARCH_DELAY,
  ROLE_ADMIN,
  ROLE_TRUSTED_USER,
  ROLE_USER } from '../../utils/constant';

import styles from './user_filter.module.css';

const UserFilter = ({ setUserFilter }) => {
    const setFilter = (filterField, value) => {
        const filter = {};
        filter[filterField] = value;
        setUserFilter(filter);
    };

    const onInputValueChanged = (event) => {
        const value = event.target.value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => setFilter('username', value) , INPUT_SEARCH_DELAY);
    };

    const onRoleChanged = (event) => {
      setFilter('role', event.target.value);
    };

    return (
        <Row>
            <BorderCol sm={12}>
                <Row>
                    <Col sm={8}>
                        <Input onChange={onInputValueChanged} />
                    </Col>
                    <Col>
                      <Input type="select" name="select" onChange={onRoleChanged}>
                        <option value=''>
                          All
                        </option>
                        <option value={ROLE_USER}>
                          User
                        </option>
                        <option value={ROLE_TRUSTED_USER}>
                          Trusted User
                        </option>
                        <option value={ROLE_ADMIN}>
                          Admin
                        </option>
                      </Input>
                    </Col>
                </Row>
            </BorderCol>
        </Row>
    )
};

export default connect( null, { setUserFilter })(UserFilter);
