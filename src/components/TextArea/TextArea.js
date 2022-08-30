import * as React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { compose } from 'recompose';
import cx from 'classnames';
import Textarea from 'react-textarea-autosize';
import { resolveStyles } from 'utils';
import { withReduxFormProps, withFocusedState, withEmptyState, withCounter } from 'hocs';

const stylePath = resolveStyles('TextArea/styles');
import(`../${stylePath}`).then();

const TextArea = (props) => {
  const {
    component: Component,
    type,
    disabled,
    invalid,
    focused,
    empty,
    kind,
    label,
    helper,
    counter,
    counterText,
    autosize,
    classNamePrefix,
    className,
    labelClassName,
    helperClassName,
    elementId,
    elementRef,
    elementClassName,
    ...otherProps
  } = props;

  const mergedClassName = cx(
    classNamePrefix,
    {
      [`${classNamePrefix}--${kind}`]: kind,
      [`${classNamePrefix}--empty`]: empty,
      [`${classNamePrefix}--active`]: focused,
      [`${classNamePrefix}--error`]: invalid,
      [`${classNamePrefix}--disabled`]: disabled,
    },
    className,
  );

  const mergedElementClassName = cx(elementClassName, `${classNamePrefix}__element`);

  const mergedLabelClassName = cx(labelClassName, `${classNamePrefix}__label`);
  const mergedHelperClassName = cx(helperClassName, `${classNamePrefix}__helper`,
    { [`${classNamePrefix}__helper--counter`]: counter });

  const elementProps = { ...otherProps, disabled };

  return (
    <div className={mergedClassName}>
      {autosize ? (
        <Textarea
          {...elementProps}
          className={mergedElementClassName}
          style={{ overflow: 'hidden' }}
        />
      ) : (
        <Component
          {...elementProps}
          type={type}
          id={elementId}
          ref={elementRef}
          className={mergedElementClassName}
        />
      )}
      {label && (<span className={mergedLabelClassName}>{label}</span>)}
      <span className={mergedHelperClassName}>{helper || counterText}</span>
    </div>
  );
};

TextArea.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  kind: PropTypes.oneOf(['grey', 'white']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  focused: PropTypes.bool,
  empty: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.node,
  helper: PropTypes.node,
  counter: PropTypes.bool,
  counterText: PropTypes.node,
  autosize: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  helperClassName: PropTypes.string,
  elementId: PropTypes.string,
  elementRef: PropTypes.func,
  elementClassName: PropTypes.string,
};

TextArea.defaultProps = {
  component: 'textarea',
  kind: 'grey',
  type: 'text',
  disabled: false,
  invalid: false,
  focused: false,
  empty: true,
  placeholder: undefined,
  label: '',
  helper: '',
  counter: false,
  counterText: '',
  autosize: false,
  classNamePrefix: 'yui-textarea',
  className: '',
  labelClassName: '',
  helperClassName: '',
  elementId: undefined,
  elementRef: noop,
  elementClassName: '',
};

export default compose(withReduxFormProps, withFocusedState, withEmptyState, withCounter)(TextArea);
