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

export default class Actions {
  public static Bold = (editor: Editor) => editor.chain().focus().toggleBold().run();
  public static Italic = (editor: Editor) => editor.chain().focus().toggleItalic().run();
  public static Strike = (editor: Editor) => editor.chain().focus().toggleStrike().run();
  public static Color = (editor: Editor, color: string) => editor.chain().focus().setColor(color).run();
  public static Highlight = (editor: Editor, color: string) => editor.chain().focus().toggleHighlight({ color: color }).run();
  public static Link = (editor: Editor, link: string) => editor.chain().focus().setLink({ href: link }).run();
  public static Underline = (editor: Editor) => editor.chain().focus().toggleUnderline().run();
  public static Table = (editor: Editor) => editor.chain().focus().insertTable().run();
  public static TextAlign = (editor: Editor, align: string) => editor.chain().focus().setTextAlign(align).run();
  public static BulletList = (editor: Editor) => editor.chain().focus().toggleBulletList().run();
  public static OrderedList = (editor: Editor) => editor.chain().focus().toggleOrderedList().run();
  public static Redo = (editor: Editor) => editor.chain().focus().redo().run();
  public static Undo = (editor: Editor) => editor.chain().focus().undo().run();
  public static Clear = (editor: Editor) => editor.chain().focus().unsetAllMarks().run();
}