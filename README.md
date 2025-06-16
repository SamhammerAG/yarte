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

- **BoldButton**
- **ItalicButton**
- **UnderlineButton**
- **BulletListButton**
- **OrderedListButton**
- **FontColorButton**
- **FontHighlightButton**
- **ImageButton**
- **KnowledgeButton**
- **RedoButton**
- **UndoButton**
- **RemoveFormatButton**
- **StrikeButton**
- **HyperlinkButton**
- **TableButton**
- **TableBubbleMenu**
- **TextAlignButton**

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
