import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { resolveStyles } from 'utils';
import cx from 'classnames';

const stylePath = resolveStyles('Snackbar/styles');
import(`../${stylePath}`).then();

const SnackbarComponent = ({ message, vertical, horizontal, className, classNamePrefix, ...otherProps }) => {
  const mergedClassName = cx(
    classNamePrefix,
    {
      [`${classNamePrefix}--${vertical}`]: vertical,
      [`${classNamePrefix}--${horizontal}`]: horizontal,
    },
    className,
  );

  let duration = 5;

  if (message) {
    if (message.length < 35) {
      duration = 3500;
    } else if (message.length > 100) {
      duration = 10000;
    } else {
      duration = message.length * 100;
    }
  }

  useEffect(() => {
    const { open, onClose } = otherProps;

    return () => {
      if (open) {
        onClose(null, 'unmount');
      }
    };
  }, [otherProps]);

  return (
    <Snackbar
      className={mergedClassName}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      autoHideDuration={duration}
      ContentProps={{
        'aria-describedby': 'message-id',
        classes: {
          root: `${classNamePrefix}__body`,
          message: `${classNamePrefix}__message`,
          action: `${classNamePrefix}__action`,
        },
      }}
      message={<span id="message-id">{message}</span>}
      {...otherProps}
    />
  );
};

SnackbarComponent.propTypes = {
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vertical: PropTypes.string,
  horizontal: PropTypes.string,
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
};

SnackbarComponent.defaultProps = {
  message: '',
  vertical: 'bottom', // top or bottom
  horizontal: 'center', // one of left, right, center
  classNamePrefix: 'yui-snackbar',
  className: '',
};

export default SnackbarComponent;
