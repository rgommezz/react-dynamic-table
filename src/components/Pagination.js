import React from 'react';
import '../styles/Posts.css';

const Pagination = ({pagesArray, currentPage, onPageChange}) => {
  return (
    <ul className="Pages">
      {pagesArray.map(page => {
          const isPageActive = page === currentPage;
          return (
            <li
              tabIndex={isPageActive ? null : "0"}
              className={isPageActive ? 'Page Page--active' : 'Page'}
              key={page}
              onClick={isPageActive ? null : onPageChange}
              onKeyDown={isPageActive ? null : onPageChange}
            >
              {page}
            </li>
          )
        }
      )}
    </ul>
  )
};

export default Pagination;
