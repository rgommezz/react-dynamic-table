import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import Filter from './Filter';
import Table from './Table';
import Pagination from './Pagination';
import { postsSelector, pagesArraySelector, currentPageSelector, sortInfoSelector } from '../reducers';
import { changePostsPerPage } from '../actions';
import '../styles/Posts.css';

class Posts extends Component {
  state = {
    modalIsOpen: false,
  };
  static propTypes = {
    posts: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    pagesArray: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
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
      const start = this.props.itemsPerPage * (nextPage - 1);
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

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const customModalStyles = {
      content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }
    };
    const { posts, username, pagesArray, currentPage, itemsPerPage, query, sort } = this.props;
    return (
      <div className="main">
        <Filter
          onQueryChange={this.handleQueryChange}
          itemsPerPage={itemsPerPage}
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
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customModalStyles}
        >
          <h3>Add a new Entry:</h3>
          <p>Create a Form component</p>
        </Modal>
        <button className="fab" onClick={this.openModal}>+</button>
      </div>
    )
  }
}

const mapStateToProps = (state, { location }) => {
  const { start = 0, q = '', sort = '' } = location.query;
  const sortInfo = sortInfoSelector(sort);
  return {
    posts: postsSelector(state, start, q, sortInfo),
    username: state.user.username,
    pagesArray: pagesArraySelector(state, q),
    currentPage: currentPageSelector(state, start),
    itemsPerPage: state.posts.itemsPerPage,
    query: q,
    sort: sortInfo,
  };
};

export default withRouter(connect(mapStateToProps, { changePostsPerPage })(Posts));
