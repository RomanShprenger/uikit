import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import { Pagination as RawPagination } from 'components';

const data = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
  'h', 'i', 'j', 'k', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'a', 'b', 'c', 'd', 'e',
  'f', 'g', 'h', 'i', 'j', 'k', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'a', 'b', 'c',
  'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'a',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];

class PaginationStory extends React.Component {
  state = {
    currentPage: 1,
    itemsPerPage: 5,
  }

  changePage = (number) => {
    this.setState({
      currentPage: number,
    });
  }

  render() {
    const { currentPage, itemsPerPage } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderItems = currentItems.map(item => <li key={item}>{item}</li>);

    return (
      <div>
        <ul className="yui-pagination__list">
          {renderItems}
        </ul>
        <RawPagination
          data={data}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          changePage={this.changePage}
        />
      </div>
    );
  }
}

export default storybook
  .storiesOf('components/Pagination', module)
  .addDecorator(withInfo({ propTables: [RawPagination], propTablesExclude: [PaginationStory] }))
  .addDecorator(withKnobs)
  .add('Pagination', () => (<PaginationStory />));
