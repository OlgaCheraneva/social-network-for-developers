import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';
import {getPosts} from '../../actions/post';

const Posts = ({post: {posts, loading}, getPosts}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    );
};

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, {getPosts})(Posts);