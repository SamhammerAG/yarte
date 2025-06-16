# @samhammer/yarte

Yet Another Rich Text Editor (YARTE) is a customizable, web component-based rich text editor built on top of [TipTap](https://tiptap.dev/). It provides a set of ready-to-use Svelte web components and extensions for building modern, flexible editing experiences in any web application.

## Features

- **Web Components**: Use editor buttons and menus as custom elements in any framework or plain HTML.
- **TipTap Extensions**: Includes a set of TipTap extensions for advanced editing features.
- **Svelte-based**: All UI components are written in Svelte for performance and reactivity.
- **Customizable**: Easily style and extend the editor to fit your needs.

## Installation

```sh
npm install @samhammer/yarte
```

## Usage

### Using Web Components

Import the web components bundle in your application:

```js
import '@samhammer/yarte/dist/web-components.js';
```

You can now use the provided custom elements in your HTML:

```html
<bold-button></bold-button>
<italic-button></italic-button>
<underline-button></underline-button>
<!-- ...and more -->
```

### Using Extensions

Import the extensions bundle to use with your TipTap editor instance:

```js
import { ImageExtension, KnowledgeExtension, SelectionDecoration, TableBubbleMenuExtension } from '@samhammer/yarte/dist/extensions.js';
```

## Components

- **yarte-bold-button**
- **yarte-italic-button**
- **yarte-underline-button**
- **yarte-bullet-list-button**
- **yarte-ordered-list-button**
- **yarte-font-color-button**
- **yarte-font-highlight-button**
- **yarte-image-button**
- **yarte-knowledge-button**
- **yarte-redo-button**
- **yarte-undo-button**
- **yarte-remove-format-button**
- **yarte-strike-button**
- **yarte-hyperlink-button**
- **yarte-table-button**
- **yarte-table-bubble-menu**
- **yarte-text-align-button**

## Extensions

- **ImageExtension**: Add image support to your editor.
- **KnowledgeExtension**: Custom knowledge mark extension.
- **SelectionDecoration**: Visual selection highlighting.
- **TableBubbleMenuExtension**: Table editing support.

## Simple TipTap Editor Example

Below is a minimal example of initializing a TipTap editor. For more advanced usage and configuration, see the [TipTap documentation](https://tiptap.dev/):

```js
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import {
  ImageExtension,
  KnowledgeExtension,
  SelectionDecoration,
  TableBubbleMenuExtension
} from '@samhammer/yarte/dist/extensions.js';

const editor = new Editor({
  element: document.querySelector('#editor'),
  extensions: [
    StarterKit,
    ImageExtension,
    KnowledgeExtension,
    SelectionDecoration,
    TableBubbleMenuExtension
  ],
  content: '<p>Hello World!</p>',
});
```

```html
<div id="editor"></div>
```

For more details and advanced configuration, visit the [TipTap documentation](https://tiptap.dev/).

## Example: Using YARTE Web Components in HTML

After importing the web components bundle, you can use the provided custom elements directly in your HTML:

```html
<!-- Import the web components bundle in your main JS/TS file -->
<script type="module">
  import '@samhammer/yarte/dist/web-components.js';
</script>

<!-- Use the custom elements in your HTML -->
<yarte-bold-button></yarte-bold-button>
<yarte-italic-button></yarte-italic-button>
<yarte-underline-button></yarte-underline-button>
<yarte-bullet-list-button></yarte-bullet-list-button>
<yarte-ordered-list-button></yarte-ordered-list-button>
<yarte-font-color-button></yarte-font-color-button>
<yarte-font-highlight-button></yarte-font-highlight-button>
<yarte-image-button></yarte-image-button>
<yarte-knowledge-button></yarte-knowledge-button>
<yarte-redo-button></yarte-redo-button>
<yarte-undo-button></yarte-undo-button>
<yarte-remove-format-button></yarte-remove-format-button>
<yarte-strike-button></yarte-strike-button>
<yarte-hyperlink-button></yarte-hyperlink-button>
<yarte-table-button></yarte-table-button>
<yarte-table-bubble-menu></yarte-table-bubble-menu>
<yarte-text-align-button></yarte-text-align-button>
```

You can place these elements anywhere in your HTML and style them as needed. For more details, see the [Usage](#usage) section above.

## Binding the Editor Instance to Web Components (Plain JavaScript)

YARTE web components require a TipTap editor instance to function. Some components, like the image upload button, also require a callback function for uploading images that returns a string (the image URL). Here is how you can do this in plain JavaScript (example for bold, italic, and image upload buttons):

```js
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import { ImageExtension } from '@samhammer/yarte/dist/extensions.js';
import '@samhammer/yarte/dist/web-components.js';

// Example image upload function (should return a Promise<string> with the image URL)
function uploadInlineImage(file) {
  // Replace this with your actual upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate upload and return a dummy URL
      resolve('https://your.cdn.com/' + file.name);
    }, 1000);
  });
}

const editor = new Editor({
  element: document.querySelector('#editor'),
  extensions: [
    StarterKit,
    Bold,
    Italic,
    ImageExtension(uploadInlineImage)
  ],
  content: '<p>Hello World!</p>',
});

// Assign the editor instance to each YARTE custom element
const boldButton = document.querySelector('yarte-bold-button');
boldButton.editor = editor;

const italicButton = document.querySelector('yarte-italic-button');
italicButton.editor = editor;

const imageButton = document.querySelector('yarte-image-button');
imageButton.editor = editor;
imageButton.imageUpload = uploadInlineImage;
```

```html
<div id="editor"></div>
<yarte-bold-button></yarte-bold-button>
<yarte-italic-button></yarte-italic-button>
<yarte-image-button></yarte-image-button>
```

> **Note:** For components like `<yarte-image-button>`, you must provide an `imageUpload` function that returns a Promise resolving to the image URL.

## Styling

YARTE components use CSS custom properties for easy theming. For example:

```css
:root {
  --yarte-bg-button: white;
  --yarte-bg-button-hover: #e2e2e2;
  --yarte-bg-icon: rgba(37, 39, 45, 0.37);
}
```

## License

MIT © Samhammer AG
