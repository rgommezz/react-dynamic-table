import React, { Component, PropTypes } from 'react';
import '../styles/Filter.css';

class Filter extends Component {
  render() {
    return <div className="Container">
      <span className="Select-title">Select posts per page:</span>
      <select value={this.props.postsPerPage} onChange={this.props.onSelectChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  }
}

export default Filter;
