import React from 'react';
import '../styles/Posts.css';

const renderHeader = (header) => (
  <th key={header} className="table__header">
    <span>{header}</span>
    <span className="fa fa-arrow-down table__header-icon" aria-hidden="true" />
  </th>
);

const Table = (props) => {
  const headers = ['ID', 'User name', 'Post title', 'Views', 'Likes', 'Created at'];
  return (
    <table className="table table-bordered table--white">
      <thead>
        <tr>
          {headers.map(header => renderHeader(header))}
        </tr>
      </thead>
      <tbody>
      {props.posts.map(post => {
        return (
          <tr key={post.id} className={props.username === post.username ? 'table__row--active' : null}>
            {Object.keys(post).map((key, i) => <td key={`${key}${i}`}>{post[key]}</td>)}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
};

export default Table;
