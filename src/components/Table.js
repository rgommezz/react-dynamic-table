import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import '../styles/Posts.css';

class Table extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
  };

  /**
   * Determines the next sortBy and sortOrder
   * Order convention: noOrder -> asc -> desc -> asc -> desc...
   * @param event
   */
  handleSortChange = (event) => {
    const previousBy = this.props.sortBy;
    // We also need to handle the case when when clicking on the child <span>s
    const newBy = event.target.getAttribute('data-title') || event.target.parentNode.getAttribute('data-title');
    const newOrder = !this.props.sortOrder || this.props.sortOrder === 'desc' || previousBy !== newBy ? 'asc' : 'desc';
    this.props.onSortChange(newBy, newOrder);
  };

  /**
   * Transforms the table header name to a more adequate format for URL: User name -> username
   * @param header
   * @returns {string}
   */
  buildHeaderTitleForURL(header) {
    return header.split(' ').join('').toLowerCase();
  }

  renderTableHeader(){
    const headers = ['ID', 'User name', 'Post title', 'Views', 'Likes', 'Created at'];
    const { sortBy, sortOrder } = this.props;
    const iconClassName = classnames({
      fa: true,
      'fa-arrow-up': sortOrder === 'desc',
      'fa-arrow-down': sortOrder === 'asc',
      'table__header-icon': true,
    });
    return (
      <tr>
        {headers.map(header => (
          <th key={header} className="table__header" data-title={this.buildHeaderTitleForURL(header)} onClick={this.handleSortChange}>
            <span>{header}</span>
            {sortBy && sortBy === this.buildHeaderTitleForURL(header) && <span className={iconClassName} />}
          </th>
        ))}
      </tr>
    )
  }

  renderTableBody() {
    const { posts, username } = this.props;
    return posts.map(post => {
      return (
        <tr key={post.id} className={username === post.username ? 'table__row--active' : null}>
          {Object.keys(post).map((key, i) => <td key={`${key}${i}`}>{post[key]}</td>)}
        </tr>
      )
    });
  }

  render() {
    return (
      <table className="table table-bordered table--white">
        <thead>
          {this.renderTableHeader()}
        </thead>
        <tbody>
          {this.renderTableBody()}
        </tbody>
      </table>
    )
  }
}

export default Table;
