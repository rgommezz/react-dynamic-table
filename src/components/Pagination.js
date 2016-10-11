import React from 'react';
import '../styles/Posts.css';

const Pagination = ({pagesArray, currentPage, onPageChange}) => {
  return (
    <ul className="pagination">
      {pagesArray.map(page => {
          const isPageActive = page === currentPage;
          return (
            <li
              tabIndex={isPageActive ? null : "0"}
              className={isPageActive ? 'pagination__page pagination__page--active' : 'pagination__page'}
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
