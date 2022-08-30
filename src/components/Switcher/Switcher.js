import * as React from 'react';
import PropTypes from 'prop-types';
import { resolveStyles } from 'utils';
import { Checkbox } from 'components/Checkbox';

const stylePath = resolveStyles('Switcher/styles');
import(`../${stylePath}`).then();

const Switcher = (props) => (
  <Checkbox
    {...props}
  />
);

Switcher.propTypes = {
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
};

Switcher.defaultProps = {
  className: '',
  classNamePrefix: 'yui-switcher',
};

export default Switcher;
