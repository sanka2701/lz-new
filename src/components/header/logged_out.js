import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as FontAwesome from 'react-icons/lib/fa'

export default () => {
    return (
        <Nav navbar>
            <NavItem>
                <NavLink tag={Link} to='/login'>
                    <span>
                        {/*<FontAwesome.FaSignIn size={32}/>{' '}*/}
                        <FormattedMessage id='nav.login' defaultMessage='Log In' />
                    </span>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} to='/register'>
                    <span>
                        {/*<FontAwesome.FaUserPlus size={32}/>{' '}*/}
                        <FormattedMessage id='nav.register' defaultMessage='Register' />
                    </span>
                </NavLink>
            </NavItem>
        </Nav>
    )
}