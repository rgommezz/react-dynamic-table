import React, { Component, PropTypes } from 'react';
import '../styles/Filter.css';

class Filter extends Component {
  static propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
    };
  }

  componentWillReceiveProps(nextProps) {
    // To handle the case when we change postsPerPage through the dropdown and we had something in the search bar unsync with the URL
    if (nextProps.query !== this.state.query) {
      this.setState({
        query: nextProps.query,
      });
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch()
    }
  };

  handleSearch = () => {
    this.props.onQueryChange(this.state.query);
  };

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  render() {
    const options = [5, 10, 15, 20]; // That could (and should) come from a configuration file. Hardcoded here for simplicity
    return (
      <div className="filter">
        <div className="filter__row">
          <div>
            <span className="filter__dropdown-title">Maximum posts per page:</span>
            <select value={this.props.itemsPerPage} onChange={this.props.onSelectChange}>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <p className="filter__table-hint">* Click on a header to sort by that column asc or desc respectively</p>
          </div>
          <div className="filter__search-container">
            <input
              type="search"
              className="form-control"
              id="searchBar"
              placeholder="Filter by username"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleInputChange}
              value={this.state.query}
            />
            <span
              tabIndex="0"
              className="fa fa-search fa-2x filter__search-button"
              onClick={this.handleSearch}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
