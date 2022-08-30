import { compose, defaultProps, mapProps, withState, withHandlers, lifecycle } from 'recompose';
import { noop, isNil } from 'lodash';
import omit from 'lodash/fp/omit';

export default (Component) => compose(
  defaultProps({ onChange: noop }),
  withState('empty', 'setEmpty', true),
  withHandlers({
    onChange: (props) => (e, ...restProps) => {
      const { setEmpty } = props;

      if (e.target) {
        setEmpty(!(e.target.value.length));
      }

      return props.onChange(e, ...restProps);
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { defaultValue, value, setEmpty } = this.props;
      if (prevProps.defaultValue !== defaultValue) {
        const val = !isNil(defaultValue) && String(defaultValue);
        setEmpty(val ? !val.trim() : !val);
      }

      if (prevProps.value !== value) {
        const val = !isNil(value) && String(value);
        setEmpty(val ? !val.trim() : !val);
      }
    },
    componentDidMount() {
      const { defaultValue, value, setEmpty } = this.props;

      let val = !isNil(defaultValue) && String(defaultValue);
      val = val || (!isNil(value) && String(value));
      setEmpty(val ? !val.trim() : !val);
    },
  }),
  mapProps(omit(['setEmpty'])),
)(Component);
