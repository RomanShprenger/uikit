import { compose, mapProps } from 'recompose';
import { flow, omit, clone } from 'lodash/fp';

export default (Component) => compose(
  mapProps(
    (props) => flow(
      clone,
      (newProps) => {
        const { meta: { error, warning } = {} } = props;
        return !error && !warning ? newProps : { ...newProps, helper: error || warning, invalid: true };
      },
      flow(
        (newProps) => ({ ...newProps, ...newProps.input }),
        omit(['meta', 'input']),
      ),
    )(props),
  ),
)(Component);
