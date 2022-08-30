import { compose, defaultProps, mapProps, withState, withHandlers, lifecycle } from 'recompose';
import { noop } from 'lodash';
import omit from 'lodash/fp/omit';

export default (Component) => compose(
  defaultProps({ onChange: noop }),
  withState('check', 'setCheck', false),
  withHandlers({
    onChange: (props) => (e, ...restProps) => {
      const { setCheck } = props;

      if (e.target) {
        setCheck(e.target.checked);
      }

      return props.onChange(e, ...restProps);
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { checked, setCheck } = this.props;

      if (checked !== prevProps.checked) {
        setCheck(checked);
      }
    },
    componentDidMount() {
      const { checked, check, setCheck } = this.props;

      setCheck(checked || check);
    },
  }),
  mapProps(omit(['setCheck'])),
)(Component);
