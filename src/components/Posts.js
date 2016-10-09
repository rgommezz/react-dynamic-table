import React, { Component } from 'react';
import { connect } from 'react-redux';

class Posts extends Component {
  render() {
    return (
      <div>
        We have {this.props.posts.length} posts in total!
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, null)(Posts);
