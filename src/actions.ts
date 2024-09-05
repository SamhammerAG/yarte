import type { Editor } from "@tiptap/core";

export default {
    ["bold"]: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    ["italic"]: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    ["strike"]: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
}


