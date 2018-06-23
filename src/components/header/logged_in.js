import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as FontAwesome from 'react-icons/lib/fa'
import { ROLE_ADMIN } from "../../utils/constant";

export default ({ onLogOut, userName, role }) => {
    return (
        <Nav>
            <NavItem>
                <NavLink onClick={onLogOut} tag={Link} to='/'>
                    <span>
                        {/*<FontAwesome.FaSignOut size={32}/>{' '}*/}
                        <FormattedMessage id='nav.logout' defaultMessage='Log Out' />
                    </span>
                </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                    <span>
                        {/*<FontAwesome.FaUser size={32}/>{' '}*/}
                        { userName }
                    </span>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag={Link} to='/createEvent'>
                        <FormattedMessage id='nav.createEvent' defaultMessage='Create Event' />
                    </DropdownItem>
                    {role === ROLE_ADMIN && (
                        <div>
                            <DropdownItem divider />
                            <DropdownItem>
                                <FormattedMessage id='nav.manageEvents' defaultMessage='Manage Events' />
                            </DropdownItem>
                            <DropdownItem>
                                <FormattedMessage id='nav.managePlaces' defaultMessage='Manage Places' />
                            </DropdownItem>
                            <DropdownItem>
                                <FormattedMessage id='nav.manageUsers' defaultMessage='Manage Users' />
                            </DropdownItem>
                            <DropdownItem>
                                <FormattedMessage id='nav.manageTags' defaultMessage='Manage Tags' />
                            </DropdownItem>
                        </div>
                    )}
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    )
}