import * as React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippy.js/react';
import { resolveStyles } from 'utils';

const stylePath = resolveStyles('Tooltip/styles');
import(`../${stylePath}`).then();

const Tooltip = ({ content, trigger, ...otherProps }) => (
  <Tippy
    content={content}
    trigger={trigger}
    {...otherProps}
  />
);

Tooltip.propTypes = {
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  trigger: PropTypes.string,
  className: PropTypes.string,
};

Tooltip.defaultProps = {
  trigger: 'mouseenter',
  className: 'yui-tooltip',
};

export default Tooltip;
