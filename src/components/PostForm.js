import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import '../styles/PostForm.css';

class PostForm extends Component {
  state = {
    isSubmitting: false,
  };
  prepareSubmit = (values) => {
    this.setState({
      isSubmitting: true,
    });
    this.props.createPost(values);
  };
  render() {
    return (
      <form className="new-post" onSubmit={this.props.handleSubmit(this.prepareSubmit)}>
        <h3 className="new-post__title">Create a new post</h3>
        <div className="form-group">
          <label htmlFor="title">Post Title</label>
          <Field className="form-control" name="title" component="input" type="text" placeholder="Post Title"/>
        </div>
        <div className="form-group">
          <label htmlFor="views">Views</label>
          <Field className="form-control" name="views" component="input" type="text" placeholder="Likes"/>
        </div>
        <div className="form-group">
          <label htmlFor="likes">Likes</label>
          <Field className="form-control" name="likes" component="input" type="text" placeholder="Views"/>
        </div>
        <div className="form-group">
          <label htmlFor="createdAt">Created At</label>
          <Field className="form-control" name="createdAt" component="input" type="date" />
        </div>
        <button className="btn btn-success" disabled={this.state.isSubmitting} type="submit">
          {this.state.isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'newPost',
})(PostForm);
