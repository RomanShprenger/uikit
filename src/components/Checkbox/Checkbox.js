import * as React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import cx from 'classnames';
import { compose } from 'recompose';
import { withReduxFormProps, withCheckedState } from 'hocs';
import { resolveStyles } from 'utils';

const stylePath = resolveStyles('Checkbox/styles');
import(`../${stylePath}`).then();

const Checkbox = (props) => {
  const {
    children,
    disabled,
    checked,
    check,
    type,
    indeterminate,
    classNamePrefix,
    className,
    id,
    elementRef,
    elementClassName,
    ...otherProps
  } = props;

  const mergedClassName = cx(
    classNamePrefix,
    {
      [`${classNamePrefix}--active`]: check === true,
      [`${classNamePrefix}--disabled`]: disabled === true,
      [`${classNamePrefix}--indeterminate`]: check !== true && indeterminate === true,
    },
    className,
  );

  const mergedElementClassName = cx(elementClassName, `${classNamePrefix}__element`);
  const labelClassName = `${classNamePrefix}__label`;
  const labelTextClassName = `${classNamePrefix}__label-text`;

  const elementProps = { ...otherProps, disabled };

  return (
    <label className={mergedClassName} htmlFor={id}>
      <input
        id={id}
        ref={elementRef}
        checked={check}
        className={mergedElementClassName}
        type={type}
        {...elementProps}
      />
      <span className={labelClassName}>
        <span className={labelTextClassName}>{children}</span>
      </span>
    </label>
  );
};

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.bool,
  check: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  id: PropTypes.string.isRequired,
  elementRef: PropTypes.func,
  elementClassName: PropTypes.string,
};

Checkbox.defaultProps = {
  disabled: false,
  classNamePrefix: 'yui-checkbox',
  className: '',
  type: 'checkbox',
  checked: null,
  indeterminate: false,
  children: null,
  elementRef: noop,
  elementClassName: '',
};

export default compose(withReduxFormProps, withCheckedState)(Checkbox);
