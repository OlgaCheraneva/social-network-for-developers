import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getProfile} from '../../actions/profile';

const Dashboard = ({auth, profile, getProfile}) => {
    useEffect(() => {
        getProfile();
    }, []);

    return <div>Dashboard</div>;
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {getProfile})(Dashboard);
