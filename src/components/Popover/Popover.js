import * as React from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippy.js/react';
import 'tippy.js/themes/light.css';
import { resolveStyles } from 'utils';
import cx from 'classnames';

const stylePath = resolveStyles('Popover/styles');
import(`../${stylePath}`).then();

const Popover = ({ content, visible, trigger, className, classNamePrefix, kind, ...otherProps }) => {
  const mergedClassName = cx(
    classNamePrefix, {
      [`${classNamePrefix}--${kind}`]: kind,
    },
    className,
  );

  return (
    <Tippy
      {...otherProps}
      className={mergedClassName}
      content={content}
      theme="light"
      visible={visible}
      trigger={trigger}
    />
  );
};

Popover.propTypes = {
  content: PropTypes.element.isRequired,
  trigger: PropTypes.string,
  visible: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  kind: PropTypes.oneOf(['menu', 'nopadding']),
};

Popover.defaultProps = {
  trigger: 'click',
  visible: undefined,
  classNamePrefix: 'yui-popover',
  className: '',
  kind: null,
};

export default Popover;
