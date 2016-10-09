import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import Pagination from './Pagination';
import { getPostsSelector, getPagesArraySelector } from '../reducers';
import { changePage } from '../actions';
import '../styles/Posts.css';

class Posts extends Component {
  handleChangePage = (event) => {
    this.props.changePage({
      currentPage: Number(event.target.innerHTML),
    });
  };
  render() {
    const { posts, username, pagesArray, currentPage } = this.props;
    return (
      <div className="Container">
        <Table
          posts={posts}
          username={username}
        />
        <Pagination
          pagesArray={pagesArray}
          currentPage={currentPage}
          changePage={this.handleChangePage}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: getPostsSelector(state),
  username: state.username,
  pagesArray: getPagesArraySelector(state),
  currentPage: state.currentPage,
});

export default connect(mapStateToProps, { changePage })(Posts);
