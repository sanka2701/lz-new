import React from 'react';
import {
    Row,
    Col,
    Input,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setUserFilter } from '../../actions';
import BorderCol from '../../components/ui/content/bordered_content';
import { INPUT_SEARCH_DELAY } from '../../utils/constant';

import styles from './user_filter.module.css';

const UserFilter = ({ filter, setUserFilter }) => {
    const onFilterChanged = () => {

    };

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

    return (
        <Row>
            <BorderCol sm={12}>
                <Row>
                    <Col sm={8}>
                        <Input onChange={onInputValueChanged} />
                    </Col>
                    <Col>
                        <UncontrolledDropdown className={styles.dropdown}>
                            <DropdownToggle color={'info'}>
                                Role
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem >User</DropdownItem>
                                <DropdownItem >Trusted User</DropdownItem>
                                <DropdownItem >Admin</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                </Row>
            </BorderCol>
        </Row>
    )
};

const mapStateToProps = ({ users: { filter } }) => {
    return {

    }
};

export default connect( mapStateToProps, { setUserFilter })(UserFilter);
