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
    const options = [5, 10, 15, 20]; // That could (and should) come from a configuration file. Hardcoded here for simplicity
    return (
      <div className="Container">
        <div className="Row">
          <div className="Dropdown">
            <span className="Select-title">Maximum posts per page:</span>
            <select value={this.props.postsPerPage} onChange={this.props.onSelectChange}>
              {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
