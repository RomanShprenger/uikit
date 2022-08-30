import * as React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { compose } from 'recompose';
import cx from 'classnames';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import Creatable from 'react-select/creatable';
import AsyncCreatable from 'react-select/async-creatable';
import { resolveStyles } from 'utils';
import { withReduxFormProps, withFocusedState } from 'hocs';
import DropdownIndicator from './DropdownIndicator';
import ValueContainer from './ValueContainer';

const stylePath = resolveStyles('Select/styles');
import(`../${stylePath}`).then();

const Select = (props) => {
  const {
    disabled,
    invalid,
    focused,
    kind,
    label,
    helper,
    async,
    creatable,
    classNamePrefix,
    className,
    labelClassName,
    helperClassName,
    elementId,
    elementRef,
    elementClassName,
    caretIcon,
    icon,
    iconSize,
    iconClassName,
    ...otherProps
  } = props;

  const mergedClassName = cx(
    classNamePrefix,
    {
      [`${classNamePrefix}--${kind}`]: kind,
      [`${classNamePrefix}--active`]: focused,
      [`${classNamePrefix}--error`]: invalid,
      [`${classNamePrefix}--disabled`]: disabled,
      [`${classNamePrefix}--icon`]: icon,
    },
    className,
  );

  const mergedElementClassName = cx(elementClassName, `${classNamePrefix}__element`);
  const mergedLabelClassName = cx(labelClassName, `${classNamePrefix}__label`);
  const mergedHelperClassName = cx(helperClassName, `${classNamePrefix}__helper`);
  const mergedIconClassName = cx(iconClassName, `${classNamePrefix}__icon`);

  const elementProps = { ...otherProps, isDisabled: disabled };

  let Component = ReactSelect;

  if (async && creatable) {
    Component = AsyncCreatable;
  } else if (async) {
    Component = AsyncSelect;
  } else if (creatable) {
    Component = Creatable;
  }

  return (
    <div className={mergedClassName}>
      <Component
        {...elementProps}
        id={elementId}
        ref={elementRef}
        components={{ DropdownIndicator, ValueContainer }}
        className={mergedElementClassName}
        classNamePrefix={classNamePrefix}
        caretIcon={caretIcon}
        icon={icon}
        iconSize={iconSize}
        iconClassName={mergedIconClassName}
      />
      {label && (<span title={label} className={mergedLabelClassName}>{label}</span>)}
      {helper && (<span title={helper} className={mergedHelperClassName}>{helper}</span>)}
    </div>
  );
};

Select.propTypes = {
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  focused: PropTypes.bool,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
  kind: PropTypes.oneOf(['white', 'grey']),
  label: PropTypes.node,
  helper: PropTypes.node,
  value: PropTypes.any, // eslint-disable-line
  async: PropTypes.bool,
  creatable: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  helperClassName: PropTypes.string,
  elementId: PropTypes.string,
  elementRef: PropTypes.func,
  elementClassName: PropTypes.string,
  caretIcon: PropTypes.string,
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  iconClassName: PropTypes.string,
};

Select.defaultProps = {
  disabled: false,
  invalid: false,
  focused: false,
  placeholder: undefined,
  isSearchable: false,
  kind: 'grey',
  label: '',
  helper: '',
  value: undefined,
  async: false,
  creatable: false,
  classNamePrefix: 'yui-select',
  className: '',
  labelClassName: '',
  helperClassName: '',
  elementId: undefined,
  elementRef: noop,
  elementClassName: '',
  caretIcon: 'arrow-compact-down',
  icon: undefined,
  iconSize: 24,
  iconClassName: '',
};

export default compose(withReduxFormProps, withFocusedState)(Select);
