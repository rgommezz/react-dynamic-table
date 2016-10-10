import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Filter from './Filter';
import Table from './Table';
import Pagination from './Pagination';
import { getPostsSelector, getPagesArraySelector, getCurrentPageSelector } from '../reducers';
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
    let query = {};
    if (nextPage === 1 && location.query.q) { // Don't erase the q param if we navigating to the 1st page
      query = { q: location.query.q};
    } else if (nextPage !== 1) { // Merging previous "q" param and new start param in the URL query
      query = {...location.query, ...{ start }};
    }
    router.push({
      pathname: location.pathname,
      query,
    });
  };

  handleSelectChange = (event) => {
    const selectedPostsPerPage = event.target.value;
    const { location: { query: { q } }, router, changePostsPerPage } = this.props;
    changePostsPerPage(Number(selectedPostsPerPage));
    // Keeping the previous q param if was specified in the URL, to keep in sync with the search bar
    router.push({
      pathname: '/posts',
      query: { q } || null,
    });
  };

  handleQueryChange = (q) => {
    // When changing the query to filter by, we remove any previous pagination state in the URL
    this.props.router.push({
      pathname: location.pathname,
      query: { q },
    })
  };

  render() {
    const { posts, username, pagesArray, currentPage, postsPerPage, location: { query: { q = '' }} } = this.props;
    return (
      <div className="Main">
        <Filter
          onQueryChange={this.handleQueryChange}
          postsPerPage={postsPerPage}
          onSelectChange={this.handleSelectChange}
          query={q}
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
  const { start = 0, q ='' } = location.query;
  return {
    posts: getPostsSelector(state, start, q),
    username: state.username,
    pagesArray: getPagesArraySelector(state, q),
    currentPage: getCurrentPageSelector(state, start),
    postsPerPage: state.postsPerPage,
  };
};

export default withRouter(connect(mapStateToProps, { changePostsPerPage })(Posts));
