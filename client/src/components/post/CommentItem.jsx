import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {deleteComment} from '../../actions/post';

const CommentItem = ({
    auth,
    comment: {_id, text, name, avatar, user, date},
    postId,
    deleteComment,
}) => {
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
                    Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button
                        className="btn btn-danger"
                        onClick={() => deleteComment(postId, _id)}
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);
