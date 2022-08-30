import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';

const DropdownIndicator = ({ selectProps: { classNamePrefix, caretIcon } }) => (
  <Icon
    name={caretIcon}
    className={`${classNamePrefix}__caret`}
  />
);

DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    classNamePrefix: PropTypes.string,
    caretIcon: PropTypes.string,
  }).isRequired,
};

export default DropdownIndicator;
