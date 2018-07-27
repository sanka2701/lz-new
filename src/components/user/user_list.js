import React from 'react';
import PropTypes from "prop-types";
import { Row, Col } from 'reactstrap';
import _ from 'lodash';

import BorderCol from '../ui/content/bordered_content';

const getRows = (users) => _.map(users, (user) => {
    return (
        <BorderCol key={'user-mng-' + user.id} sm={12}>
            { user.username }
        </BorderCol>
    )
});

const UserList = ({ users }) => (
    <Row>
        { getRows(users) }
    </Row>
);

UserList.propTypes = {
    users: PropTypes.array.isRequired
};

export default UserList;