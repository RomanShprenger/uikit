import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import cx from 'classnames';
import ReactTable from 'react-table';
import { resolveStyles } from 'utils';
import './styles/base.scss';

const stylePath = resolveStyles('Table/styles');
import(`../${stylePath}`).then();

const Table = ({ className, classNamePrefix, footerAsTotal, tableRef, withStickyHeader, ...otherProps }) => {
  const ref = (node) => {
    if (!node) return;

    tableRef(node);
  };

  let headerGroup, header, footer, cloneDimensions, headerClone, sticked, body, table; //eslint-disable-line

  const setHeaderCloneDimensions = (clone) => {
    let width = 0;
    let height = 0;

    if (headerGroup) {
      const headerGroupBounding = headerGroup.getBoundingClientRect();

      height += headerGroupBounding.height;
      width = width || headerGroupBounding.width;
    }

    if (header) {
      const headerBounding = header.getBoundingClientRect();

      height += headerBounding.height;
      width = width || headerBounding.width;
    }

    if (footerAsTotal && footer) {
      const footerBounding = footer.getBoundingClientRect();

      height += footerBounding.height;
      width = width || footerBounding.width;
    }

    clone.style.width = `${width}px`; // eslint-disable-line
    clone.style.height = `${height}px`; // eslint-disable-line

    cloneDimensions = { width, height };

    return clone;
  };

  const getHeaderClone = () => {
    if (headerClone) {
      return setHeaderCloneDimensions(headerClone);
    }

    const table = ref.querySelector('.rt-table[role="grid"]'); // eslint-disable-line

    headerClone = document.createElement('div');

    headerClone.style.position = 'fixed';
    headerClone.style.display = 'none';
    headerClone.style.zIndex = 99999;
    headerClone.classList.add('sticky-clone');

    table.appendChild(headerClone);

    return setHeaderCloneDimensions(headerClone);
  };

  const makeDumbClone = (element) => {
    const dumbClone = element.cloneNode(true);

    dumbClone.classList.add('sticky-clone-element');

    return dumbClone;
  };

  const moveHeaders = (isSticky, clone) => {
    if (isSticky && sticked) {
      return;
    }

    if (!isSticky && !sticked) {
      return;
    }

    if (isSticky) {
      if (headerGroup) {
        clone.appendChild(headerGroup);
        table.insertBefore(makeDumbClone(headerGroup), body);
      }

      if (header) {
        clone.appendChild(header);
        table.insertBefore(makeDumbClone(header), body);
      }

      if (footerAsTotal && footer) {
        clone.appendChild(footer);
        table.insertBefore(makeDumbClone(footer), clone);
      }

      clone.style.display = 'block'; // eslint-disable-line
    } else {
      clone.style.display = 'none'; // eslint-disable-line

      document.querySelectorAll('.sticky-clone-element').forEach((element) => element.parentNode.removeChild(element));

      if (headerGroup) {
        table.insertBefore(headerGroup, body);
      }

      if (header) {
        table.insertBefore(header, body);
      }

      if (footerAsTotal && footer) {
        table.insertBefore(footer, clone);
      }
    }

    sticked = isSticky;
  };

  const checkHeaderPosition = () => {
    if (!withStickyHeader || ref) {
      return;
    }

    table = table || ref.querySelector('.rt-table[role="grid"]');
    headerGroup = headerGroup || ref.querySelector('.rt-thead.-headerGroups');
    header = header || ref.querySelector('.rt-thead.-header');
    body = body || ref.querySelector('.rt-tbody');
    footer = footer || ref.querySelector('.rt-tfoot');

    const containerBounding = withStickyHeader === true ? { top: 0 } : withStickyHeader.getBoundingClientRect();
    const clone = getHeaderClone();

    const bodyBounding = body.getBoundingClientRect();

    clone.style.top = `${containerBounding.top}px`;
    clone.style.left = `${bodyBounding.left}px`;

    moveHeaders(bodyBounding.top - cloneDimensions.height < containerBounding.top, clone);
  };

  const handleScroll = () => {
    throttle(checkHeaderPosition, 10);
  };

  const handleResize = () => {
    throttle(checkHeaderPosition, 50);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    window.addEventListener('api-resize', handleResize);

    return () => {
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('api-resize', handleResize);
    };
  });

  return (
    <ReactTable
      className={cx(className, classNamePrefix, { 'with-footer-as-total': footerAsTotal })}
      ref={ref}
      {...otherProps}
    />
  );
};

Table.propTypes = {
  footerAsTotal: PropTypes.bool,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  tableRef: PropTypes.func,
  withStickyHeader: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Element),
  ]),
};

Table.defaultProps = {
  footerAsTotal: false,
  className: '',
  classNamePrefix: 'yui-table',
  tableRef: () => {},
  withStickyHeader: undefined,
};

export default Table;
