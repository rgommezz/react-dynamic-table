import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Filter from './Filter';
import Table from './Table';
import Pagination from './Pagination';
import { getPostsSelector, getPagesArraySelector, getCurrentPageSelector, getSortInfoSelector } from '../reducers';
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

  handleRouterChange = (pathname, query) => {
    this.props.router.push({ pathname, query });
  };

  handlePageChange = (event) => {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      const { location } = this.props;
      const nextPage = Number(event.target.innerHTML);
      const start = this.props.postsPerPage * (nextPage - 1);
      let query = {};
      if (nextPage === 1 && Object.keys(location.query).length > 0) { // Erasing start param, prevailing the rest
        query = { ...location.query };
        delete query.start;
      } else if (nextPage !== 1) { // Merging previous query params and new start param in the URL query
        query = {...location.query, ...{ start }};
      }
      this.handleRouterChange(location.pathname, query);
    }
  };

  handleSelectChange = (event) => {
    const selectedPostsPerPage = event.target.value;
    const { location: { query: { q } }, changePostsPerPage } = this.props;
    changePostsPerPage(Number(selectedPostsPerPage));
    // Keeping the previous q param if was specified in the URL, to keep in sync with the search bar
    this.handleRouterChange('/posts', { q } || {});
  };

  handleQueryChange = (q) => {
    // When changing the query to filter by, we remove any previous pagination state in the URL
    if (q !== this.props.location.query.q) {
      this.handleRouterChange(location.pathname, q ? { q } : {});
    }
  };
  
  handleSortChange = (by, order) => {
    const { pathname, query } = this.props.location;
    const sortQuery = `${by} ${order}`;
    this.handleRouterChange(pathname, { ...query, ...{ sort: sortQuery } });
  };

  render() {
    const { posts, username, pagesArray, currentPage, postsPerPage, query, sort } = this.props;
    return (
      <div className="main">
        <Filter
          onQueryChange={this.handleQueryChange}
          postsPerPage={postsPerPage}
          onSelectChange={this.handleSelectChange}
          query={query}
        />
        {posts.length > 0 ?
          <Table
            sortBy={sort.by}
            sortOrder={sort.order}
            data={posts}
            rowActive={{column: 'username', matcher: username}}
            onSortChange={this.handleSortChange}
          />
          :
          <div className="message">Sorry, there are no results for the criteria specified :(</div>
        }
        {pagesArray.length > 1 &&
          <Pagination
            pagesArray={pagesArray}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, { location }) => {
  const { start = 0, q = '', sort = '' } = location.query;
  const sortInfo = getSortInfoSelector(sort);
  return {
    posts: getPostsSelector(state, start, q, sortInfo),
    username: state.username,
    pagesArray: getPagesArraySelector(state, q),
    currentPage: getCurrentPageSelector(state, start),
    postsPerPage: state.postsPerPage,
    query: q,
    sort: sortInfo,
  };
};

export default withRouter(connect(mapStateToProps, { changePostsPerPage })(Posts));
