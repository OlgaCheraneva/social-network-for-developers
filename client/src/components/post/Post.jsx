import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import PostItem from '../posts/PostItem';
import {getPost} from '../../actions/post';

const Post = ({post: {post, loading}, getPost, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem
                        key={comment._id}
                        comment={comment}
                        postId={post._id}
                    />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, {getPost})(Post);
