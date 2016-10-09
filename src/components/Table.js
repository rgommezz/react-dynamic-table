import React from 'react';

const Table = (props) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>User name</th>
          <th>Post title</th>
          <th>Views</th>
          <th>Likes</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
      {props.posts.map(post => {
        return (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.username}</td>
            <td>{post.title}</td>
            <td>{post.views}</td>
            <td>{post.likes}</td>
            <td>{post.createdAt}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
};

export default Table;
