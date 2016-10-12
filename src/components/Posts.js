import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Modal from 'react-modal';
import Filter from './Filter';
import Table from './Table';
import PostForm from './PostForm';
import Pagination from './Pagination';
import { postsSelector, pagesArraySelector, currentPageSelector, sortInfoSelector } from '../reducers';
import { changePostsPerPage, createNewPost } from '../actions';
import '../styles/Posts.css';

class Posts extends Component {
  state = {
    isModalOpen: false,
  };
  static propTypes = {
    posts: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    pagesArray: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    router: PropTypes.object.isRequired,
    query: PropTypes.string.isRequired,
    sort: PropTypes.object.isRequired,
    postsLength: PropTypes.number.isRequired,
    changePostsPerPage: PropTypes.func.isRequired,
    createNewPost: PropTypes.func.isRequired,
  };

  handleRouterChange = (pathname, query = {}) => {
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

  handleSubmit = (formValues) => {
    const { username, postsLength } = this.props;
    // Easy way of generating a new unique ID
    const id = postsLength + 1;
    // To remove .0000 decimals
    formValues.likes = Math.floor(formValues.likes);
    formValues.views = Math.floor(formValues.views);

    const newPost = { ...{ id, username}, ...formValues };
    // Simulating a submission to the server
    setTimeout(() => {
      this.setState({
        isModalOpen: false,
      });
      this.props.createNewPost(newPost);
      this.handleRouterChange('/posts');
    }, 1000);
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
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
        backgroundColor: '#B2DFDB',
        padding: 40,
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
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
            headers={['id', 'username', 'title', 'views', 'likes', 'createdAt']}
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
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          style={customModalStyles}
        >
          <PostForm onSubmit={this.handleSubmit} />
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
    postsLength: state.posts.data.length, // handy for generating simple unique IDs
  };
};

const mapDispatchToProps = {
  changePostsPerPage,
  createNewPost,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts));
