
import { Highlight } from "@tiptap/extension-highlight";

export const ExtendedHighlight = Highlight.extend({
  name: "highlightMark",
  priority: 103,
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: (element) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      ...(this.parent?.() || []),
      {
        consuming: false,
        tag: "span",
        getAttrs: (node) => node.style.backgroundColor !== "" && null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["mark", HTMLAttributes, 0];
  },
});
