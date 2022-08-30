import * as React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { Icon } from 'components';
import { noop } from 'lodash';

const ValueContainer = ({ children, selectProps: { icon, iconSize, iconClassName }, ...otherProps }) => (
  <components.ValueContainer {...otherProps}>
    {icon && (
      <Icon name={icon} size={iconSize} className={iconClassName} />
    )}
    {children}
  </components.ValueContainer>
);

ValueContainer.propTypes = {
  selectProps: PropTypes.shape({
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    iconClassName: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

ValueContainer.defaultProps = {
  children: noop,
};

export default ValueContainer;
