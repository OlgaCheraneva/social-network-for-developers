import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Spinner from '../layout/Spinner';
import {getGithubRepositories} from '../../actions/profile';

const ProfileGithub = ({username, repositories, getGithubRepositories}) => {
    useEffect(() => {
        getGithubRepositories(username);
    }, [username, getGithubRepositories]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github Repositories</h2>
            {repositories === null ? (
                <Spinner />
            ) : (
                repositories.map((repo) => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

ProfileGithub.propTypes = {
    username: PropTypes.string.isRequired,
    repositories: PropTypes.array.isRequired,
    getGithubRepositories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    repositories: state.profile.repositories,
});

export default connect(mapStateToProps, {getGithubRepositories})(ProfileGithub);
