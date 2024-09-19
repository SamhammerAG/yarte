
import type { Editor } from "@tiptap/core";
import type { Action } from "../types/Action";
import type { ActionsContext } from "../types/ActionsContext";
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
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import {
  configureHighlight,
  configureImage,
  configureTable,
  configureTextAlign,
  extendImage
} from "./EnrichExtensions";

export default class ActionDefinitions {

  private static imagePath = "./icons/";

  public static Bold: Action = {
    key: "bold",
    buttonIcon: this.imagePath + "bold.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    extensions: [Bold]
  };

  public static Italic: Action = {
    key: "italic",
    buttonIcon: this.imagePath + "italic.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    extensions: [Italic]
  };

  public static Strike: Action = {
    key: "strike",
    buttonIcon: this.imagePath + "strikethrough.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    extensions: [Strike]
  };

  public static Underline: Action = {
    key: "underline",
    buttonIcon: this.imagePath + "underline.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().toggleUnderline().run(),
    extensions: [Underline]
  };

  public static BulletList: Action = {
    key: "bulletList",
    buttonIcon: this.imagePath + "list-unordered.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    extensions: [BulletList, ListItem]
  };

  public static OrderedList: Action = {
    key: "orderedList",
    buttonIcon: this.imagePath + "list-ordered.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    extensions: [OrderedList, ListItem]
  };

  public static Color: Action = {
    key: "color",
    buttonIcon: this.imagePath + "font-color.svg",
    buttonAction: (editor: Editor, color: string) => editor.chain().focus().setColor(color).run(),
    buttonAction2: (editor: Editor) => editor.chain().focus().unsetColor().run(),
    extensions: [Color, TextStyle]
  };

  public static Highlight: Action = {
    key: "highlight",
    buttonIcon: this.imagePath + "palette-line.svg",
    buttonAction: (editor: Editor, color: string) => editor.chain().focus().toggleHighlight({ color: color }).run(),
    buttonAction2: (editor: Editor) => editor.chain().focus().unsetHighlight().run(),
    extensions: [configureHighlight(Highlight)]
  };

  public static Link: Action = {
    key: "link",
    buttonIcon: this.imagePath + "link.svg",
    buttonAction: (editor: Editor, link: string) => editor.chain().focus().setLink({ href: link }).run(),
    extensions: [Link]
  };

  public static Table: Action = {
    key: "table",
    buttonIcon: this.imagePath + "table-line.svg",
    buttonAction: (editor: Editor, rows: number, cols: number) => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run(),
    extensions: [configureTable(Table), TableRow, TableCell, TableHeader]
  };

  public static TextAlign: Action = {
    key: "textAlign",
    buttonIcon: this.imagePath + "align-left.svg",
    buttonAction: (editor: Editor, align: string) => editor.chain().focus().setTextAlign(align).run(),
    extensions: [configureTextAlign(TextAlign)],
    subactions: [
      {
        key: "left",
        buttonIcon: this.imagePath + "align-left.svg",
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("left").run(),
        extensions: [TextStyle]
      },
      {
        key: "center",
        buttonIcon: this.imagePath + "align-center.svg",
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("center").run(),
        extensions: [TextStyle]
      },
      {
        key: "right",
        buttonIcon: this.imagePath + "align-right.svg",
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("right").run(),
        extensions: [TextStyle]
      },
      {
        key: "justify",
        buttonIcon: this.imagePath + "align-justify.svg",
        buttonAction: (editor: Editor) => editor.chain().focus().setTextAlign("justify").run(),
        extensions: [TextStyle]
      }
    ]
  };

  public static Image: (uploadCallback: Function) => Action = (uploadCallback: Function) => {
    return {
      key: "image",
      buttonIcon: this.imagePath + "image-add-line.svg",
      buttonAction: (editor: Editor, link: string) => editor.chain().focus().setImage({ src: link }).run(),
      extensions: [extendImage(configureImage(Image), uploadCallback)]
    }
  }

  public static Undo: Action = {
    key: "undo",
    buttonIcon: this.imagePath + "arrow-go-back-line.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().undo().run(),
    extensions: [History]
  }

  public static Redo: Action = {
    key: "redo",
    buttonIcon: this.imagePath + "arrow-go-forward-line.svg",
    buttonAction: (editor: Editor) => editor.chain().focus().redo().run(),
    extensions: [History]
  }

  public static Clear: Action = {
    key: "clear",
    buttonIcon: this.imagePath + "format-clear.svg",
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
