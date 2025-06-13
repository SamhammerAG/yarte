
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'


// Credits to https://github.com/ueberdosis/tiptap/discussions/4963#discussioncomment-12922003

export const SelectionDecoration = Extension.create({
  name: 'selectionDecoration',

  addOptions() {
    return {
      className: 'selection',
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('selection'),
        props: {
          decorations: (state) => {
            const { selection } = state
            const { isFocused } = this.editor

            // Skip decoration if editor is focused or no selection
            if (isFocused || selection.empty) {
              return null
            }

            return DecorationSet.create(state.doc, [
              Decoration.inline(selection.from, selection.to, {
                class: this.options.className,
                style: "background-color: rgba(0, 153, 255, 0.25)"
              }),
            ])
          },
        },
      }),
    ]
  },
})
