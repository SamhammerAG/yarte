import { Plugin } from "@tiptap/pm/state";
import BubbleMenu from "@tiptap/extension-bubble-menu";

export const bbbleMenu = BubbleMenu.configure().extend({
  addProseMirrorPlugins: () => {
    return [
      new Plugin({
        props: {},
      }),
    ];
  },
});
