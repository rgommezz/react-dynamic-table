import React, { Component } from 'react';
import '../styles/Filter.css';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
    };
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
    return (
      <div className="Container">
        <div className="Row">
          <div className="Dropdown">
            <span className="Select-title">Maximum posts per page:</span>
            <select value={this.props.postsPerPage} onChange={this.props.onSelectChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="Search">
            <input
              type="search"
              className="form-control"
              id="searchBar"
              placeholder="Filter by username"
              onKeyDown={this.handleKeyDown}
              onChange={this.handleInputChange}
              value={this.state.query}
            />
            <i className="fa fa-search fa-2x Search-button" onClick={this.handleSearch} />
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
