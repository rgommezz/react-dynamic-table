import React from 'react';
import '../styles/Posts.css';

const Table = (props) => {
  const headers = ['ID', 'User name', 'Post title', 'Views', 'Likes', 'Created at'];
  return (
    <table className="table table-bordered table-white">
      <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
      {props.posts.map(post => {
        return (
          <tr key={post.id} className={props.username === post.username ? 'Row--active' : null}>
            {Object.keys(post).map((key, i) => <td key={`${key}${i}`}>{post[key]}</td>)}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
};

export default Table;
