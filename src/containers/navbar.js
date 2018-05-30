import React, { Component } from 'react';
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
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeLocale } from '../actions/index';

class SiteNavigation extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            isNavbarOpen: false
        };
    }
    toggleNavbar() {
        this.setState({
            isNavbarOpen: !this.state.isNavbarOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand tag={Link} to='/' >
                            LiptovŽije
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.isNavbarOpen} navbar>
                        <Nav className='mr-auto' navbar>
                            <NavItem>
                                <NavLink tag={Link} to='/'>
                                    <FormattedMessage id='nav.home' defaultMessage='Home' />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/events'>
                                    <FormattedMessage id='nav.events' defaultMessage='Events' />
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            <NavItem>
                                <NavLink tag={Link} to='/login'>
                                    <FormattedMessage id='nav.login' defaultMessage='Log In' />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to='/register'>
                                    <FormattedMessage id='nav.register' defaultMessage='Register' />
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {this.props.currentLocale}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => this.props.changeLocale('sk')}>Slovensky</DropdownItem>
                                    <DropdownItem onClick={() => this.props.changeLocale('pl')}>Polski</DropdownItem>
                                    <DropdownItem onClick={() => this.props.changeLocale('en')}>English</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentLocale: state.locale.locale
    }
}

export default connect(mapStateToProps, {changeLocale})(SiteNavigation);