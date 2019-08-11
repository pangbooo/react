import { configure, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import { withNotes } from '@storybook/addon-notes';

addDecorator(
    withOptions({
      name: 'CRA Kitchen Sink',
      goFullScreen: false,
      showAddonsPanel: true,
      showSearchBox: false
      // more configuration here
    })
  );

//use addon-notes
// addDecorator(withNotes);

const req = require.context('../stories', true, /\.stories\.js$/);

function loadStories() {
  // require('../stories/index.js');
  // You can require as many stories as you need.

  //Loading stories dynamically
  require('../stories/welcome');
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);