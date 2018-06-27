import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { post } from '../../actions';
import { USERS_LOADED } from '../../actions/types';

class UserList extends React.Component {

    componentDidMount(){
        const request = {
            endpoint: 'users/filter',
            params: {},
            payload: {approved : !this.props.managerView},
            successAction: USERS_LOADED,
            failureAction: 'nok'
        };

        this.props.post(request);
    }

    render() {
        console.log('users', this.props.users);

        return (
            <div>
                Listed Users
            </div>
        )
    }
}

const mapStateToProps = ({users}) => {
    return { users }
};

export default connect(mapStateToProps, { post })(UserList);