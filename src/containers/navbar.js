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

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color='dark' dark expand='md'>
                    <NavbarBrand href='/'>LiptovŽije</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
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
                        </Nav>
                    </Collapse>
                </Navbar>
                <button type='button' onClick={() => this.props.changeLocale('en')}>
                    En Locale
                </button>
                <button type='button' onClick={() => this.props.changeLocale('sk')}>
                    Sk Locale
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentLocale: state.locale.locale
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({changeLocale}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteNavigation);