import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			user
				? <Component {...props} />
				: (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location },
					}}
					/>
				)
		)}
	/>
);
const mapStateToProps = ({ auth: { user } }) => ({ user });
export default connect(mapStateToProps)(PrivateRoute);
