import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { resolveStyles } from 'utils';

const stylePath = resolveStyles('Icon/styles', 'font.js');
import(`../${stylePath}`).then();

const Icon = ({ name, color, size, className, classNamePrefix, ...otherProps }) => (
  <i
    className={cx(className, classNamePrefix, `${classNamePrefix}--${name}`)}
    style={{ fontSize: `${size}px`, lineHeight: `${size}px`, color }}
    {...otherProps}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
};

Icon.defaultProps = {
  color: '',
  size: 24,
  className: '',
  classNamePrefix: 'yui-icon',
};

export default Icon;
