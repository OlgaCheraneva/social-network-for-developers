import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import {getProfile, deleteAccount} from '../../actions/profile';

const Dashboard = ({
    auth: {user},
    profile: {loading, profile},
    getProfile,
    deleteAccount,
}) => {
    useEffect(() => {
        getProfile();
        // eslint-disable-next-line
    }, []);

    if (loading && profile === null) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {user && user.name}
            </p>
            {profile === null ? (
                <Fragment>
                    <p>
                        You haven't setup a profile yet. Please add some
                        information
                    </p>
                    <Link to="/edit-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            ) : (
                <Fragment>
                    <DashboardActions />
                    <Experience />
                    <Education />
                </Fragment>
            )}
            <div className="my-2">
                <button
                    className="btn btn-danger"
                    onClick={() => deleteAccount()}
                >
                    <i className="fas fa-user-minus" /> Delete My Account
                </button>
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {getProfile, deleteAccount})(Dashboard);
