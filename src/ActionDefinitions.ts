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
import BoldAction from "./toolbar-actions/BoldAction.svelte";
import ItalicAction from "./toolbar-actions/ItalicAction.svelte";
import StrikeAction from "./toolbar-actions/StrikeAction.svelte";
import UnderlineAction from "./toolbar-actions/UnderlineAction.svelte";
import BulletListAction from "./toolbar-actions/BulletListAction.svelte";
import NumberedListAction from "./toolbar-actions/NumberedListAction.svelte";
import FontColorAction from "./toolbar-actions/FontColorAction.svelte";
import FontHighlightAction from "./toolbar-actions/FontHighlightAction.svelte";
import HyperlinkAction from "./toolbar-actions/HyperlinkAction.svelte";
import TableAction from "./toolbar-actions/TableAction.svelte";
import TextAlignAction from "./toolbar-actions/TextAlignAction.svelte";
import ImageUploadAction from "./toolbar-actions/ImageUploadAction.svelte";
import UndoAction from "./toolbar-actions/UndoAction.svelte";
import RedoAction from "./toolbar-actions/RedoAction.svelte";
import RemoveFormatAction from "./toolbar-actions/RemoveFormatAction.svelte";
import {
  configureHighlight,
  configureTable,
  configureLink,
  configureTextAlign,
  extendImage
} from "./EnrichExtensions";

export default class ActionDefinitions {

  public static readonly Bold: Action = {
    key: "bold",
    component: BoldAction,
    extensions: () => [Bold]
  };

  public static readonly Italic: Action = {
    key: "italic",
    component: ItalicAction,
    extensions: () => [Italic]
  };

  public static readonly Strike: Action = {
    key: "strike",
    component: StrikeAction,
    extensions: () => [Strike]
  };

  public static readonly Underline: Action = {
    key: "underline",
    component: UnderlineAction,
    extensions: () => [Underline]
  };

  public static readonly BulletList: Action = {
    key: "bulletList",
    component: BulletListAction,
    extensions: () => [BulletList, ListItem]
  };

  public static readonly OrderedList: Action = {
    key: "orderedList",
    component: NumberedListAction,
    extensions: () => [OrderedList, ListItem]
  };

  public static readonly Color: Action = {
    key: "color",
    component: FontColorAction,
    extensions: () => [Color, TextStyle]
  };

  public static readonly Highlight: Action = {
    key: "highlight",
    component: FontHighlightAction,
    extensions: () => [configureHighlight(Highlight)]
  };

  public static readonly Link: Action = {
    key: "link",
    component: HyperlinkAction,
    extensions: () => [configureLink(Link)]
  };

  public static readonly Table: Action = {
    key: "table",
    component: TableAction,
    extensions: () => [configureTable(Table), TableRow, TableCell, TableHeader]
  };

  public static readonly TextAlign: Action = {
    key: "textAlign",
    component: TextAlignAction,
    extensions: () => [configureTextAlign(TextAlign), TextStyle]
  };

  public static readonly Image = {
    key: "image",
    component: ImageUploadAction,
    extensions: (context: ActionsContext) => [extendImage(Image, context.imageUpload)],
  };

  public static readonly Undo: Action = {
    key: "undo",
    component: UndoAction,
    extensions: () => [History]
  };

  public static readonly Redo: Action = {
    key: "redo",
    component: RedoAction,
    extensions: () => [History]
  };

  public static readonly Clear: Action = {
    key: "clear",
    component: RemoveFormatAction,
    extensions: () => []
  };

  public static getActions(): Action[] {
    return [
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
      this.Image
    ];
  }
}
