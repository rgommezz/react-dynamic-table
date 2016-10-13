import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import '../styles/Posts.css';

class Table extends Component {
  static propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string).isRequired, // They need to match the row object keys
    data: PropTypes.array.isRequired,
    rowActive: PropTypes.shape({
      column: PropTypes.string,
      matcher: PropTypes.string,
    }).isRequired,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
  };

  /** Validation for correct component functioning */
  componentWillMount() {
    const { headers } = this.props;
    const keys = Object.keys(this.props.data[0]);
    headers.forEach(h => {
      if (keys.indexOf(h) === -1) {
        throw new Error('One of the headers provided do not match a property from the row entity, please revise' +
          '"headers" and "data" props supplied');
      }
    })
  }

  /**
   * Determines the next sortBy and sortOrder
   * Order convention: noOrder -> asc -> desc -> asc -> desc...
   * @param event
   */
  handleSortChange = (event) => {
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
      const previousBy = this.props.sortBy;
      // We also need to handle the case when when clicking on the child <span>s
      const newBy = event.target.getAttribute('data-title') || event.target.parentNode.getAttribute('data-title');
      const newOrder = !this.props.sortOrder || this.props.sortOrder === 'desc' || previousBy !== newBy ? 'asc' : 'desc';
      this.props.onSortChange(newBy, newOrder);
    }
  };

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
    const { sortBy, sortOrder, headers } = this.props;
    // Asc = arrow up, Desc = arrow down
    //http://ux.stackexchange.com/questions/37564/use-up-or-down-arrow-to-represent-sort-ascending-at-table-header
    const iconClassName = classnames({
      fa: true,
      'fa-arrow-up': sortOrder === 'asc',
      'fa-arrow-down': sortOrder === 'desc',
      'table__header-icon': true,
    });
    return (
      <tr>
        {headers
          .map(header => (
            <th tabIndex="0" onKeyDown={this.handleSortChange} key={header} className="table__header" data-title={header} onClick={this.handleSortChange}>
              <span>{this.buildReadableHeader(header)}</span>
              {sortBy && sortBy === header && <span className={iconClassName} />}
            </th>
        ))}
      </tr>
    )
  }

  renderTableBody() {
    const { data, rowActive: { column, matcher }, headers } = this.props;
    return data.map(post => {
      return (
        <tr key={post.id} className={matcher === post[column] ? 'table__row--active' : null}>
          {headers.map((key, i) => <td key={`${key}${i}`}>{post[key]}</td>)}
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
