import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { getPostsSelector } from '../reducers';
import '../styles/Posts.css';

class Posts extends Component {
  render() {
    return (
      <div className="Container">
        <Table posts={this.props.posts} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: getPostsSelector(state),
});

export default connect(mapStateToProps, null)(Posts);
