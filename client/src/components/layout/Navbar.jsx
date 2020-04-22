import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {logout} from '../../actions/auth';

const Navbar = ({isAuthenticated, loading, logout}) => {
    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user" />{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevNetwork
                </Link>
            </h1>
            {!loading && (
                <ul>
                    <li>
                        <Link to="/profiles">Developers</Link>
                    </li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

export default connect(mapStateToProps, {logout})(Navbar);
