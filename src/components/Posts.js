import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Filter from './Filter';
import Table from './Table';
import Pagination from './Pagination';
import { getPostsSelector, getPagesArraySelector, getCurrentPage } from '../reducers';
import { changePostsPerPage } from '../actions';
import '../styles/Posts.css';

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    pagesArray: PropTypes.array.isRequired,
    postsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    router: PropTypes.object.isRequired,
    changePostsPerPage: PropTypes.func.isRequired,
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
  handleSelectChange = (event) => {
    this.props.changePostsPerPage(Number(event.target.value));
    this.props.router.push('/posts');
  };
  render() {
    const { posts, username, pagesArray, currentPage, postsPerPage } = this.props;
    return (
      <div className="Container">
        <Filter
          postsPerPage={postsPerPage}
          onSelectChange={this.handleSelectChange}
        />
        <Table
          posts={posts}
          username={username}
        />
        {pagesArray.length > 1 ?
          <Pagination
            pagesArray={pagesArray}
            currentPage={currentPage}
            changePage={this.handleChangePage}
          />
          : null
        }
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

export default withRouter(connect(mapStateToProps, { changePostsPerPage })(Posts));
