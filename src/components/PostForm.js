import React from 'react';
import { Field, reduxForm } from 'redux-form';
import '../styles/PostForm.css';

const isPositiveInteger = (value) =>
  typeof Number(value) === 'number' && Number(value) % 1 === 0 && Number(value) >= 0;

const validate = values => {
  const errors = {};
  if (!values.title ) {
    errors.title = 'Required';
  }
  if (!values.views) {
    errors.views = 'Required';
  } else if (!isPositiveInteger(values.views)) {
    errors.views = 'Views should be a positive Integer!';
  }
  if (!values.likes) {
    errors.likes = 'Required';
  } else if (!isPositiveInteger(values.likes)) {
    errors.likes = 'Likes should be an positive Integer!';
  }
  if (!values.createdAt) {
    errors.createdAt = 'Required';
  }
  return errors;
};

const renderField = ({ input, label, type, name, meta: { touched, error } }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <div>
      <input id={name} className="form-control" {...input} placeholder={label} type={type}/>
      {touched && (error && <span className="form-control__error">* {error}</span>)}
    </div>
  </div>
);

const PostForm = ({ handleSubmit, submitSucceeded, invalid }) => (
  <form className="new-post" onSubmit={handleSubmit}>
    <h3 className="new-post__title">Create a new post</h3>
    <div className="form-group">
      <Field name="title" component={renderField} type="text" label="Post Title"/>
    </div>
    <div className="form-group">
      <Field name="views" component={renderField} type="text" label="Views"/>
    </div>
    <div className="form-group">
      <Field name="likes" component={renderField} type="text" label="Likes"/>
    </div>
    <div className="form-group">
      <Field name="createdAt" component={renderField} type="date" label="Created At" />
    </div>
    <button className="btn btn-success" disabled={submitSucceeded || invalid} type="submit">
      {submitSucceeded ? 'Creating...' : 'Create'}
    </button>
  </form>
);

export default reduxForm({
  form: 'newPost',
  validate,
})(PostForm);
