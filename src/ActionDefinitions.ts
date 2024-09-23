
import type { Editor } from "@tiptap/core";
import type { Action } from "../types/Action";
import type { ActionsContext } from "../types/ActionsContext";
import Color from "@tiptap/extension-color";
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
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import BoldIcon from "../icons/bold.svg?raw";
import ItalicIcon from "../icons/italic.svg?raw";
import UnderlineIcon from "../icons/underline.svg?raw";
import StrikeIcon from "../icons/strikethrough.svg?raw";
import ListUnorderedIcon from "../icons/list-unordered.svg?raw";
import ListOrdererdIcon from "../icons/list-ordered.svg?raw";
import FontColorIcon from "../icons/font-color.svg?raw";
import HighlightColorIcon from "../icons/palette-line.svg?raw";
import LinkIcon from "../icons/link.svg?raw";
import TableIcon from "../icons/table-line.svg?raw";
import TextAlignRightIcon from "../icons/align-right.svg?raw";
import TextAlignLeftIcon from "../icons/align-left.svg?raw";
import TextAlignCenterIcon from "../icons/align-center.svg?raw";
import TextAlignJustifyIcon from "../icons/align-justify.svg?raw";
import ImageIcon from "../icons/image-add-line.svg?raw";
import UndoIcon from "../icons/arrow-go-back-line.svg?raw";
import RedoIcon from "../icons/arrow-go-forward-line.svg?raw";
import ClearIcon from "../icons/format-clear.svg?raw";
import {
  configureHighlight,
  configureTable,
  configureTextAlign,
  extendImage
} from "./EnrichExtensions";

export default class ActionDefinitions {

  public static Bold: Action = {
    key: "bold",
    buttonIcon: BoldIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    extensions: [Bold]
  };

  public static Italic: Action = {
    key: "italic",
    buttonIcon: ItalicIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    extensions: [Italic]
  };

  public static Strike: Action = {
    key: "strike",
    buttonIcon: StrikeIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    extensions: [Strike]
  };

  public static Underline: Action = {
    key: "underline",
    buttonIcon: UnderlineIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
    extensions: [Underline]
  };

  public static BulletList: Action = {
    key: "bulletList",
    buttonIcon: ListUnorderedIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    extensions: [BulletList, ListItem]
  };

  public static OrderedList: Action = {
    key: "orderedList",
    buttonIcon: ListOrdererdIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    extensions: [OrderedList, ListItem]
  };

  public static Color: Action = {
    key: "color",
    buttonIcon: FontColorIcon,
    buttonAction: (editor: Editor, color: string) => editor.chain().focus().setColor(color).run(),
    buttonAction2: (editor: Editor) => editor.chain().focus().unsetColor().run(),
    extensions: [Color, TextStyle]
  };

  public static Highlight: Action = {
    key: "highlight",
    buttonIcon: HighlightColorIcon,
    buttonAction: (editor: Editor, color: string) => editor.chain().focus().toggleHighlight({ color: color }).run(),
    buttonAction2: (editor: Editor) => editor.chain().focus().unsetHighlight().run(),
    extensions: [configureHighlight(Highlight)]
  };

  public static Link: Action = {
    key: "link",
    buttonIcon: LinkIcon,
    buttonAction: (editor: Editor, link: string) => editor.chain().focus().setLink({ href: link }).run(),
    extensions: [Link]
  };

  public static Table: Action = {
    key: "table",
    buttonIcon: TableIcon,
    buttonAction: (editor: Editor, rows: number, cols: number) => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run(),
    extensions: [configureTable(Table), TableRow, TableCell, TableHeader]
  };

  public static TextAlign: Action = {
    key: "textAlign",
    buttonIcon: TextAlignLeftIcon,
    buttonAction: () => { },
    extensions: [configureTextAlign(TextAlign)],
    subactions: [
      {
        key: "left",
        buttonIcon: TextAlignLeftIcon,
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("left").run(),
        extensions: [TextStyle]
      },
      {
        key: "center",
        buttonIcon: TextAlignCenterIcon,
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("center").run(),
        extensions: [TextStyle]
      },
      {
        key: "right",
        buttonIcon: TextAlignRightIcon,
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("right").run(),
        extensions: [TextStyle]
      },
      {
        key: "justify",
        buttonIcon: TextAlignJustifyIcon,
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("justify").run(),
        extensions: [TextStyle]
      }
    ]
  };

  public static Image = (uploadImageCallback: (file: File) => Promise<string>): Action => ({
    key: "image",
    buttonIcon: ImageIcon,
    buttonAction: (editor: Editor, file: File) => uploadImageCallback(file).then((imageSrc: string) => editor.chain().focus().setImage({ src: imageSrc }).run()),
    extensions: [extendImage(Image, uploadImageCallback)],
  });

  public static Undo: Action = {
    key: "undo",
    buttonIcon: UndoIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().undo().run(),
    extensions: [History]
  };

  public static Redo: Action = {
    key: "redo",
    buttonIcon: RedoIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().redo().run(),
    extensions: [History]
  };

  public static Clear: Action = {
    key: "clear",
    buttonIcon: ClearIcon,
    buttonAction: (editor: Editor) => editor.chain().focus().unsetAllMarks().run(),
    extensions: []
  };

  public static getActions = (context: ActionsContext): Action[] => [
    this.Bold,
    this.Italic,
    this.Strike,
    this.Underline,
    this.Color,
    this.Highlight,
    this.Link,
    this.Table,
    this.TextAlign,
    this.BulletList,
    this.OrderedList,
    this.Clear,
    this.Undo,
    this.Redo,
    this.Image(context.imageUpload)
  ];
}
