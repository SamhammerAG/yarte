import type { Editor } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";

export default Object.entries({
  ["bold"]: (editor: Editor) => editor.chain().focus().toggleBold().run(),
  ["italic"]: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
  ["strike"]: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
  ["color"]: (editor: Editor, color: string) =>
    editor.chain().focus().setColor(color).run(),
  ["highlight"]: (editor: Editor, color: string) =>
    editor.chain().focus().toggleHighlight({ color: color }).run(),
  ["link"]: (editor: Editor, link: string) =>
    editor.chain().focus().setLink({ href: link }).run(),
  ["underline"]: (editor: Editor) =>
    editor.chain().focus().toggleUnderline().run(),
  ["table"]: (editor: Editor) => editor.chain().focus().insertTable().run(),
  ["text-align-left"]: (editor: Editor) =>
    editor.chain().focus().setTextAlign("left").run(),
  ["text-align-center"]: (editor: Editor) =>
    editor.chain().focus().setTextAlign("center").run(),
  ["text-align-right"]: (editor: Editor) =>
    editor.chain().focus().setTextAlign("right").run(),
  ["text-align-justify"]: (editor: Editor) =>
    editor.chain().focus().setTextAlign("justify").run(),
  ["bullet-list"]: (editor: Editor) =>
    editor.chain().focus().toggleBulletList().run(),
  ["ordered-list"]: (editor: Editor) =>
    editor.chain().focus().toggleOrderedList().run(),
  ["redo"]: (editor: Editor) => editor.chain().focus().redo().run(),
  ["undo"]: (editor: Editor) => editor.chain().focus().undo().run(),
  ["clear"]: (editor: Editor) => editor.chain().focus().unsetAllMarks().run(),
});
