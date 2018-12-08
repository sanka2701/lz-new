import React from 'react';
import { connect } from 'react-redux';
import { loadUsersByFilter } from '../../actions';
import UserFilter from './user_filter';
import UserList from '../../components/user/user_list';
import withLoadingAnimation from '../../components/ui/content/withLodingAnimation';
import { makeGetUsersByFilter } from '../../filters/users_filter';
import BorderCol from '../../components/ui/content/bordered_content';

const UserListWithSpinner = withLoadingAnimation(UserList);

class UserTop extends React.Component {
    componentDidMount() {
        this.props.loadUsersByFilter({});
    }

    render = () => {
        const { isLoading, users } = this.props;

        return (
            <div>
                <UserFilter />
                <UserListWithSpinner users={users} isLoading={isLoading} />
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    const getUsersByFilter = makeGetUsersByFilter();
    return {
        isLoading: users.isLoading,
        users: getUsersByFilter(users)
    }
};

export default connect( mapStateToProps, { loadUsersByFilter })(UserTop);