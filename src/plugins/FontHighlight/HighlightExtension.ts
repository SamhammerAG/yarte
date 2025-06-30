
import { mergeAttributes } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";

export const ExtendedHighlight = Highlight.extend({
  priority: 103,

  parseHTML() {
    return [
      ...this.parent?.(),
      {
        consuming: false,
        tag: "span",
        getAttrs: (node) => {
          if (node.style.backgroundColor !== "") return { color: node.style.backgroundColor }
          else return false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["mark", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});
