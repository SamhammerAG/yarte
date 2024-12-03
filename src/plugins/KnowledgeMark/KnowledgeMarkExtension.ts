import { Mark, mergeAttributes } from "@tiptap/core";

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    knowledgeMark: {
      /**
       * Set a knowledge mark
       * @param attributes The highlight attributes
       * @example editor.commands.setHighlight({ color: 'red' })
       */
      setKnowledgeMark: () => ReturnType,
      /**
       * Toggle a knowledge mark
       * @param attributes The highlight attributes
       * @example editor.commands.toggleHighlight({ color: 'red' })
       */
      toggleKnowledgeMark: () => ReturnType,
      /**
       * Unset a knowledge mark
       * @example editor.commands.unsetHighlight()
       */
      unsetKnowledgeMark: () => ReturnType,
    }
  }
}

export const KnowledgeMark = Mark.create({
  name: "knowledgeMark",
  parseHTML() {
    return [
      {
        tag: "span",
        attrs: { translate: "no" }
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { translate: "no" }), 0];
  },
  addCommands() {
    return {
      setKnowledgeMark: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleKnowledgeMark: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetKnowledgeMark: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
    }
  }
});
