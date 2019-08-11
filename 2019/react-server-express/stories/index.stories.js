import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';
import { checkA11y } from '@storybook/addon-a11y';
import { linkTo, hrefTo } from '@storybook/addon-links'
import Button from '../app/components/Button';

import buttonDoc from './readMe/Button.md'

import Container from './Container';

const InfoButton = () => (
    <span
      style={{
        fontFamily: 'sans-serif',
        fontSize: 12,
        textDecoration: 'none',
        background: '#000000',
        color: '#ffffff',
        padding: '5px 15px',
        margin: 10,
        borderRadius: '0px 0px 0px 5px',
      }}
    >
      {' '}
      Show Info{' '}
    </span>
  );

storiesOf('Button', module)
  // .addDecorator(withInfo)
  .addDecorator(checkA11y)
  .addDecorator(withNotes)
  .addDecorator(story => <div style={{ color: 'red,' }}>{story()}</div>)
  .add('with text', () =>  <button onClick={linkTo('Button', 'with some emoji')}>Go to "with some emoji"</button>)
  .add('with some emoji', 
    () => (
        <Button onClick={action('clicked')} size='lg'>
        <span role="img" aria-label="so cool">
            😀 😎 👍 💯
        </span>
        </Button>
    ),
    { notes: {markdown : buttonDoc} })
    // .add('test info',
    //     () => <Button onClick={action('clicked')}>Hello Button</Button>,
    //     { info: { inline: true, header: true }  }
    // )
        .add(
      'addons composition',
      withInfo('see Notes panel for composition info')(context => (
        <div>
          click the <InfoButton /> label in top right for info about "{context.story}"
        </div>
      )),
      {
        notes: 'Composition: Info(Notes())',
        options: { selectedAddonPanel: 'storybook/notes/panel' },
      }
    )
    .add(
      'with new info',
      withInfo(
        'Use the [info addon](https://github.com/storybooks/storybook/tree/master/addons/info) with its new painless API.'
      )(context => (
        <Container>
          click the <InfoButton /> label in top right for info about "{context.story}"
        </Container>
      )),
      {
        options: { selectedAddonPanel: 'storybook/info/info-panel' }, //note panel first show
      }
    )
  
//   storiesOf('Button', module)
//     .addDecorator(withNotes)
//     .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>, {
//       options: { selectedAddonPanel: 'storybook/actions/actions-panel' },
//     })
//     .add(
//       'with some emoji',
//       () => (
//         <Button onClick={action('clicked')}>
//           <span role="img" aria-label="so cool">
//             😀 😎 👍 💯
//           </span>
//         </Button>
//       ),
//       {
//         options: { selectedAddonPanel: 'storybook/actions/actions-panel' },
//       }
//     )
//     .add('with notes', () => <Button>Check my notes in the notes panel</Button>, {
//       notes: 'A very simple button',
//       options: { selectedAddonPanel: 'storybook/notes/panel' },
//     })
//     .add(
//       'with new info',
//       withInfo(
//         'Use the [info addon](https://github.com/storybooks/storybook/tree/master/addons/info) with its new painless API.'
//       )(context => (
//         <Container>
//           click the <InfoButton /> label in top right for info about "{context.story}"
//         </Container>
//       )),
//       {
//         options: { selectedAddonPanel: 'storybook/info/info-panel' },
//       }
//     )
//     .add(
//       'addons composition',
//       withInfo('see Notes panel for composition info')(context => (
//         <div>
//           click the <InfoButton /> label in top right for info about "{context.story}"
//         </div>
//       )),
//       {
//         notes: 'Composition: Info(Notes())',
//         options: { selectedAddonPanel: 'storybook/notes/panel' },
//       }
//     )

