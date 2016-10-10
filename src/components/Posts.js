import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Table from './Table';
import Pagination from './Pagination';
import { getPostsSelector, getPagesArraySelector, getCurrentPage } from '../reducers';
import { changePage } from '../actions';
import '../styles/Posts.css';

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    pagesArray: PropTypes.array.isRequired,
    postsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    router: PropTypes.object.isRequired,
  };
  handleChangePage = (event) => {
    const { router, location } = this.props;
    const nextPage = Number(event.target.innerHTML);
    const start = this.props.postsPerPage * (nextPage - 1);
    router.push({
      pathname: location.pathname,
      query: nextPage !== 1 ? { start } : null,
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

const mapStateToProps = (state, { location }) => {
  const { start = 0 } = location.query;
  return {
    posts: getPostsSelector(state, start),
    username: state.username,
    pagesArray: getPagesArraySelector(state),
    currentPage: getCurrentPage(state, start),
    postsPerPage: state.postsPerPage,
  };
};

export default withRouter(connect(mapStateToProps, { changePage })(Posts));
