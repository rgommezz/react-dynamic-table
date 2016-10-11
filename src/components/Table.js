import React from 'react';
import '../styles/Posts.css';

const renderTableHeader = () => {
  const headers = ['ID', 'User name', 'Post title', 'Views', 'Likes', 'Created at'];
  return (
    <tr>
      {headers.map(header => (
        <th key={header} className="table__header">
          <span>{header}</span>
          <span className="fa fa-arrow-down table__header-icon" aria-hidden="true" />
        </th>
      ))}
    </tr>
  )
};

const renderTableBody = (posts, username) =>
  posts.map(post => {
    return (
      <tr key={post.id} className={username === post.username ? 'table__row--active' : null}>
        {Object.keys(post).map((key, i) => <td key={`${key}${i}`}>{post[key]}</td>)}
      </tr>
    )
  });

const Table = ({ posts, username }) => {
  return (
    <table className="table table-bordered table--white">
      <thead>
        {renderTableHeader()}
      </thead>
      <tbody>
        {renderTableBody(posts, username)}
      </tbody>
    </table>
  )
};

export default Table;
