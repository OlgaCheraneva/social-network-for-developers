import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getPosts} from '../../actions/post';

const Posts = ({post: {posts, loading}, getPosts}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return <div></div>;
};

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    post: state.post,
});

export default connect(mapStateToProps, {getPosts})(Posts);
