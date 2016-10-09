import React from 'react';
import '../styles/Posts.css';

const Pagination = ({ pagesArray, currentPage, changePage }) => {
  return (
    <ul className="Pages">
      {pagesArray.map(page =>
        <li
          className={page === currentPage ? 'Page Page--active' : 'Page'}
          key={page}
          onClick={changePage} >
            {page}
        </li>
      )}
    </ul>
  )
};

export default Pagination;
