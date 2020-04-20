import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import {connect} from 'react-redux';

import {deleteExperience} from '../../actions/profile';

const DATE_FORMAT = 'YYYY/MM/DD';

const Experience = ({experience, deleteExperience}) => {
    const formattedExperience = experience.map((exp) => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format={DATE_FORMAT}>{moment.utc(exp.time)}</Moment> -{' '}
                {exp.to === null ? (
                    ' Now'
                ) : (
                    <Moment format={DATE_FORMAT}>{moment.utc(exp.to)}</Moment>
                )}
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteExperience(exp._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        experience.length > 0 && (
            <Fragment>
                <h2 className="my-2">Experience</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hade-sm">Title</th>
                            <th className="hade-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{formattedExperience}</tbody>
                </table>
            </Fragment>
        )
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    experience: state.profile.profile.experience,
});

export default connect(mapStateToProps, {deleteExperience})(Experience);
