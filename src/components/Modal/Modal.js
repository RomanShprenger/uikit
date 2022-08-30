import * as React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { resolveStyles } from 'utils';
import cx from 'classnames';

const stylePath = resolveStyles('Modal/styles');
import(`../${stylePath}`).then();

const ModalComponent = ({ classNamePrefix, className, header, body, footer, ...otherProps }) => {
  const mergedClassName = cx(
    classNamePrefix,
    className,
  );

  return (
    <Modal
      {...otherProps}
      className={mergedClassName}
      overlayClassName="yui-overlay"
    >
      {header && (
        <div className={`${classNamePrefix}__header`}>
          {header}
        </div>
      )}
      {body && (
        <div className={`${classNamePrefix}__body`}>
          {body}
        </div>
      )}
      {footer && (
        <div className={`${classNamePrefix}__footer`}>
          {footer}
        </div>
      )}
    </Modal>
  );
};

ModalComponent.propTypes = {
  classNamePrefix: PropTypes.string,
  className: PropTypes.string,
  header: PropTypes.node,
  body: PropTypes.node,
  footer: PropTypes.node,
};

ModalComponent.defaultProps = {
  classNamePrefix: 'yui-modal',
  className: '',
  header: null,
  body: null,
  footer: null,
};

export default ModalComponent;
