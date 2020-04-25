import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {
    const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        addPost({text});
        setText('');
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Post Something Here</h3>
            </div>
            <form className="form my-1" onSubmit={onSubmit}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-bark my-1"
                />
            </form>
        </div>
    );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
};

export default connect(null, {addPost})(PostForm);
