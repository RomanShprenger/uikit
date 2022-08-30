import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import { Table, Checkbox, Icon } from 'components';

const data = [
  { firstName: 'George', lastName: 'Batonov', age: 180, visits: 50 },
  { firstName: 'Genady', lastName: 'Tester', age: 12, visits: 56 },
  { firstName: 'Jora', lastName: 'Tester', age: 45, visits: 456 },
  { firstName: 'Den', lastName: 'Tester', age: 22, visits: 345 },
  { firstName: 'Box', lastName: 'Tester', age: 76, visits: 67 },
  { firstName: 'Tom', lastName: 'Tester', age: 16, visits: 23 },
  { firstName: 'Jerry', lastName: 'Tester', age: 18, visits: 34 },
  { firstName: 'Wolf', lastName: 'Tester', age: 22, visits: 311 },
  { firstName: 'Gas', lastName: 'Tester', age: 25, visits: 34 },
  { firstName: 'Disel', lastName: 'Tester', age: 27, visits: 3457 },
  { firstName: 'Sun', lastName: 'Tester', age: 33, visits: 12 },
  { firstName: 'Ton', lastName: 'Tester', age: 41, visits: 1 },
  { firstName: 'George', lastName: 'Batonov', age: 180, visits: 50 },
  { firstName: 'Genady', lastName: 'Tester', age: 12, visits: 56 },
  { firstName: 'Jora', lastName: 'Tester', age: 45, visits: 456 },
  { firstName: 'Den', lastName: 'Tester', age: 22, visits: 345 },
  { firstName: 'Box', lastName: 'Tester', age: 76, visits: 67 },
  { firstName: 'Tom', lastName: 'Tester', age: 16, visits: 23 },
  { firstName: 'Jerry', lastName: 'Tester', age: 18, visits: 34 },
  { firstName: 'Wolf', lastName: 'Tester', age: 22, visits: 311 },
  { firstName: 'Gas', lastName: 'Tester', age: 25, visits: 34 },
  { firstName: 'Disel', lastName: 'Tester', age: 27, visits: 3457 },
  { firstName: 'Sun', lastName: 'Tester', age: 33, visits: 12 },
  { firstName: 'Ton', lastName: 'Tester', age: 41, visits: 1 },
];
const columns = (state, onCheckboxChange) => [
  {
    sortable: false,
    Header: <Checkbox checked={state.checked} onChange={onCheckboxChange} />,
  },
  {
    Header: 'Name',
    columns: [
      { Header: (
        <div>First Name <Icon name="arrow-small-down" /></div>
      ),
      accessor: 'firstName',
      Footer: 'Total',
      minWidth: 300,
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => <div><Icon name="arrow-small-down" /> { d.lastName }</div>,
        minWidth: 300,
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      { Header: 'Age', accessor: 'age', Footer: '$100' },
    ],
    minWidth: 100,
  },
  {
    Header: 'Stats',
    columns: [
      { Header: 'Visits', accessor: 'visits' },
    ],
    minWidth: 100,
  },
];

class TableStory extends React.Component {
  state = {
    checked: false,
  };

  onCheckboxChange = e => console.info('Changed', e) || this.setState({ checked: e.target.checked });

  render() {
    if (!this.ref) {
      setTimeout(() => this.setState({}), 10);
    }

    return (
      <div>
        <div style={{ height: '80px', background: 'red' }}>Header</div>
        <div ref={el => this.ref = el} style={{ overflow: 'auto', margin: '0 0 0 50px', height: '300px' }}>
          <h1>This is table</h1>
          <p>Table header should be sticky</p>
          <Table
            data={data}
            defaultPageSize={data.length}
            columns={columns(this.state, this.onCheckboxChange)}
            showPagination={false}
            footerAsTotal
            withStickyHeader={this.ref}
          />
        </div>
      </div>
    );
  }
}

export default storybook
  .storiesOf('components/Table', module)
  .addDecorator(withInfo({ propTables: [Table] }))
  .addDecorator(withKnobs)
  .add('Table', () => <TableStory />);
