import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import '../styles/Posts.css';

class Table extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    rowActive: PropTypes.shape({
      column: PropTypes.string,
      matcher: PropTypes.string,
    }).isRequired,
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
    return header.split(' ').join('');
  }

  /**
   * Transforms camelCase to Camel Case text
   * @param header
   * @returns {string}
   */

  buildReadableHeader(header) {
    const result = header.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
    return `${header.charAt(0).toUpperCase()}${result.slice(1)}`;
  }

  renderTableHeader(){
    const { sortBy, sortOrder, data } = this.props;
    const iconClassName = classnames({
      fa: true,
      'fa-arrow-up': sortOrder === 'desc',
      'fa-arrow-down': sortOrder === 'asc',
      'table__header-icon': true,
    });
    return (
      <tr>
        {Object.keys(data[0])
          .map(header => (
            <th key={header} className="table__header" data-title={this.buildHeaderTitleForURL(header)} onClick={this.handleSortChange}>
              <span>{this.buildReadableHeader(header)}</span>
              {sortBy && sortBy === this.buildHeaderTitleForURL(header) && <span className={iconClassName} />}
            </th>
        ))}
      </tr>
    )
  }

  renderTableBody() {
    const { data, rowActive: { column, matcher } } = this.props;
    return data.map(post => {
      return (
        <tr key={post.id} className={matcher === post[column] ? 'table__row--active' : null}>
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
