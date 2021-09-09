# @spotter-app/core

This library contains methods for communication between external plugins and Spotter.

Plugins are cli applications, Spotter calls their cli commands and parses a response. 



## Prerequisites

You need [Node.js](https://nodejs.org) and [Spotter](https://github.com/ziulev/spotter).




## Usage

- Initialize plugin

```bash
mkdir spotter-example-plugin && cd $_ && touch index.js
```

- Install `@spotter-app/core`

```bash
npm init && npm i --save @spotter-app/core
```

- Add `"bin": "index.js"` and `"type": "module"` to package.json
- Add `@spotter-app/core` imports to `index.js`  and do your thing (see example bellow).
- Publish package to npm `npm publish`
- Install plugin in Spotter: `plugins <tab> spotter-example-plugin <enter>`




## Example

```javascript
import { onInit, registerOptions, onAction } from '@spotter-app/core';

onInit(() => {
  registerOptions([{
    title: 'Have a go',
    action: 'haveAGoAction',
  }]);
});

onAction('haveAGoAction', () => {
  // Have a go logic here
});
```



## API

### onInit(() => void)

Runs when Spotter is first opened.

  ```javascript
  onInit(() => {
  	//
  });
  ```



### registerOptions(Option[])

Registers options in Spotter database



### Option

Displays in Spotter results

```typescript
interface Option {
  title: string,
  icon: string | { uri: string },
  action: string | {
    name: string,
    arguments: any[],
  },
  onQueryAction: string | {
    name: string,
    arguments: any[],
  },
}
```



### onAction(actionName: string, (...args: any[] | query: string) => void)

Runns when option with `action` selected and <enter> pressed



Runs callback when passed action name has been selected in Spotter options.

Callback runs with `query: string` if no arguments were passed.

```javascript
/* Action without arguments (with query argument by default):
* {
*   title: 'Have a go',
*   action: 'haveAGoAction'
* }
*/

onAction('haveAGoAction', (query) => {
  //
});
```

```javascript
/* Action with arguments:
* {
*   title: 'Have a go',
*   action: {
*     name: 'haveAGoAction'
*     arguments: ['myArgument']
*   }
* }
*/

onAction('haveAGoAction', (myArgument) => {
  //
});
```



### onQueryAction (actionName: string, (...args: any[] | query: string) => void)

Runns when option with `onQueryAction` selcted and  <tab> pressed (uses to "open" child option menu)



Runs callback when passed action name has been selected in Spotter options.

Callback runs with `query: string` if no arguments were passed.

```javascript
/* Action without arguments (with query argument by default):
* {
*   title: 'Have a go',
*   onQueryAction: 'haveAGoAction'
* }
*/

onQueryAction('haveAGoAction', (query) => {
  //
});
```

```javascript
/* Action with arguments:
* {
*   title: 'Have a go',
*   onQueryAction: {
*     name: 'haveAGoAction'
*     arguments: ['myArgument']
*   }
* }
*/

onQueryAction('haveAGoAction', (myArgument) => {
  //
});
```

