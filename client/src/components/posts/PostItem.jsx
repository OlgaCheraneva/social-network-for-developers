import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const PostItem = ({auth, post, showActions}) => {
    const {_id, text, name, avatar, user, likes, comments, date} = post;

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img src={avatar} alt={name} className="round-img" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted an <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {showActions && (
                    <Fragment>
                        <button className="btn btn-light">
                            <i className="fas fa-thumbs-up" />{' '}
                            <span>{likes.length > 0 && likes.length}</span>
                        </button>
                        <button className="btn btn-light">
                            <i className="fas fa-thumbs-down" />
                        </button>
                        <Link to={`/posts/${_id}`} className="btn btn-primary">
                            Discussion{' '}
                            {comments.length > 0 && (
                                <span className="comment-count">
                                    {comments.length}
                                </span>
                            )}
                        </Link>
                        {!auth.loading && user === auth.user._id && (
                            <button className="btn btn-danger">
                                <i className="fas fa-times" />
                            </button>
                        )}
                    </Fragment>
                )}
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    showActions: true,
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({auth: state.auth});

export default connect(mapStateToProps, {})(PostItem);
