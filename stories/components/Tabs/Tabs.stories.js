import React from 'react';
import * as storybook from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { Tabs, Tab, TabList, TabPanel } from 'components';

class TabsStory extends React.PureComponent {
  state = {
    tabIndex: 2,
  };

  render() {
    const { tabIndex } = this.state;
    return (
      <Tabs selectedIndex={tabIndex} onSelect={newIndex => this.setState({ tabIndex: newIndex })}>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
          <Tab disabled>Title 3</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>
    );
  }
}


export default storybook
  .storiesOf('components/Tabs', module)
  .addDecorator(withInfo({ propTables: [Tabs] }))
  .addDecorator(withKnobs)
  .add('Tabs', () => (
    <>
      <TabsStory />
    </>
  ));
