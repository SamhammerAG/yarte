import { Extension } from "@tiptap/core"
import { Decoration, DecorationSet } from "@tiptap/pm/view"
import { Plugin, PluginKey } from 'prosemirror-state'

export const SelectionDecoration = Extension.create({
  name: "selectionDecoration",
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("selectionDecoration"),
        props: {
          decorations: (state) => {
            const { selection } = state
            const { isFocused } = this.editor

            if (isFocused || selection.empty) {
              return null
            }

            return DecorationSet.create(state.doc, [
              Decoration.inline(selection.from, selection.to, {
                class: "selection",
                style: "background-color: rgba(0, 120, 212, 0.3);"
              }),
            ])
          },
        },
      }),
    ]
  },
})
