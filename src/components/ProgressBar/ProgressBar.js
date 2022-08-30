import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { resolveStyles } from 'utils';

const stylePath = resolveStyles('ProgressBar/styles');
import(`../${stylePath}`).then();

const ProgressBar = ({ from, to, helper, progress, classNamePrefix, className, ...otherProps }) => {
  const mergedClassName = cx(classNamePrefix, className);

  return (
    <div className={mergedClassName} {...otherProps}>
      <div className={`${classNamePrefix}__label`}>
        {from && (<span className={`${classNamePrefix}__from`}>{from}</span>)}
        {to && (<span className={`${classNamePrefix}__to`}>{to}</span>)}
      </div>
      <div className={`${classNamePrefix}__scale`}>
        <div
          className={`${classNamePrefix}__progress`}
          style={{ width: `${(progress * 248) / 100}px` }}
        />
      </div>
      <div className={`${classNamePrefix}__helper`}>
        {helper}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  from: PropTypes.string,
  to: PropTypes.string,
  helper: PropTypes.node,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
};

ProgressBar.defaultProps = {
  from: null,
  to: null,
  helper: null,
  classNamePrefix: 'yui-progressbar',
  className: '',
};

export default ProgressBar;
