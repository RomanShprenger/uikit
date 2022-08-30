import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { resolveStyles } from 'utils';
import cx from 'classnames';
import Media from 'react-media';

const stylePath = resolveStyles('Pagination/styles');
import(`../${stylePath}`).then();

const Pagination = ({ data, maxItems, itemsPerPage, currentPage, changePage, prev, next, classNamePrefix }) => {
  const dataLength = data.length === 0 ? maxItems : data.length;
  const indexOfLastPage = Math.ceil(dataLength / itemsPerPage);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const updatedPageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i += 1) {
      updatedPageNumbers.push(i);
    }
    setPageNumbers((prevPageNumbers) => prevPageNumbers.concat(updatedPageNumbers));
  }, [dataLength, itemsPerPage]);

  const filterPages = (visiblePages, totalPages) => visiblePages.filter((page) => page <= totalPages);

  const getVisibleDesktop = (page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    }

    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total];
    }

    if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    }

    return [1, 2, 3, 4, 5, total];
  };

  const getVisibleMobile = (page, total) => {
    if (total < 4) {
      return filterPages([1, 2, 3], total);
    }

    if (page % 5 >= 0 && page >= 4 && page + 2 <= total) {
      return [1, page, total];
    }

    if (page % 5 >= 0 && page >= 4 && page + 2 >= total) {
      return [1, total - 1, total];
    }

    return [1, 2, 3, total];
  };

  const handleClickNext = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= indexOfLastPage) {
      changePage(nextPage);
    }
  };

  const handleClickPrev = () => {
    const prevPage = currentPage - 1;

    if (prevPage >= 1) {
      changePage(prevPage);
    }
  };

  const handleClick = (event) => {
    const currentPageNum = Number(event.target.dataset.id);

    changePage(currentPageNum);
  };

  const renderPageNumbers = (someArray) => someArray.map((number, index, array) => (
    <li
      key={number.toString()}
      className={`${classNamePrefix}__item-wrapper`}
    >
      {array[index - 1] + 1 < number && (
        <button
          type="button"
          className={cx(`${classNamePrefix}__item`, `${classNamePrefix}__item--dots`)}
        >
          {'...'}
        </button>
      )}
      <button
        type="button"
        data-id={number}
        onClick={handleClick}
        className={cx(`${classNamePrefix}__item`, { [`${classNamePrefix}__item--current`]: currentPage === number })}
      >
        {number}
      </button>
    </li>
  ));

  return (
    <div>
      <ul className={classNamePrefix}>
        {currentPage !== 1 && (
          <li>
            <button
              type="button"
              className={cx(`${classNamePrefix}__item`, `${classNamePrefix}__item--prev`)}
              onClick={handleClickPrev}
            >{prev}
            </button>
          </li>
        )}
        <Media query="(max-width: 480px)">
          {(matches) =>
            (matches ? (renderPageNumbers(getVisibleMobile(currentPage, pageNumbers.length)))
              : (renderPageNumbers(getVisibleDesktop(currentPage, pageNumbers.length)))) }
        </Media>
        {currentPage !== indexOfLastPage && (
          <li>
            <button
              type="button"
              className={cx(`${classNamePrefix}__item`, `${classNamePrefix}__item--next`)}
              onClick={handleClickNext}
            >{next}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any), // Использовать maxItems вместо data по-возможности
  maxItems: PropTypes.number, // (в дальнейшем на него - maxItems, перейдем)
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  prev: PropTypes.string,
  next: PropTypes.string,
  classNamePrefix: PropTypes.string,
};

Pagination.defaultProps = {
  prev: 'prev',
  next: 'next',
  classNamePrefix: 'yui-pagination',
  data: [],
  maxItems: 0,
};

export default Pagination;
