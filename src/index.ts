import BoldButton from "./plugins/Bold/BoldAction.svelte";
import FontColorButton from "./plugins/FontColor/FontColorAction.svelte";
import TableButton from "./plugins/Table/TableAction.svelte";
import TableBubbleMenu from "./plugins/Table/TableBubbleMenu.svelte";
import BulletListButton from "./plugins/BulletList/BulletListAction.svelte";
import FontHighlightButton from "./plugins/FontHighlight/FontHighlightAction.svelte";
import ImageExtension from "./plugins/Image/ImageExtension";
import ImageButton from "./plugins/Image/ImageUploadAction.svelte";
import ItalicButton from "./plugins/Italic/ItalicAction.svelte";
import KnowledgeButton from "./plugins/KnowledgeMark/KnowledgeMarkAction.svelte";
import KnowledgeExtension from "./plugins/KnowledgeMark/KnowledgeMarkExtension";
import OrderedListButton from "./plugins/OrderedList/OrderedListAction.svelte";
import TextAlignButton from "./plugins/TextAlign/TextAlignAction.svelte";
import RedoButton from "./plugins/Redo/RedoAction.svelte";
import RemoveFormatButton from "./plugins/RemoveFormat/RemoveFormatAction.svelte";
import StrikeButton from "./plugins/Strikethrough/StrikeAction.svelte";
import UnderlineButton from "./plugins/Underline/UnderlineAction.svelte";
import UndoButton from "./plugins/Undo/UndoAction.svelte";
import { HyperlinkBubbleMenuExtension } from "./plugins/Hyperlink/HyperlinkPlugin";
import HyperLinkBubbleMenu from "./plugins/Hyperlink/HyperLinkBubbleMenu.svelte";
import HyperlinkButton from "./plugins/Hyperlink/HyperlinkAction.svelte";
import {
  getBubbleMenuExtension as TableBubbleMenuExtension
} from "./plugins/Table/TableExtension";

import type { Editor } from "@tiptap/core";

interface CustomHTMLElement extends HTMLElement {
  editor: Editor;
  imageUpload: (file: File) => Promise<string>;
}

export {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  BulletListButton,
  OrderedListButton,
  FontColorButton,
  FontHighlightButton,
  ImageButton,
  KnowledgeButton,
  RedoButton,
  UndoButton,
  RemoveFormatButton,
  StrikeButton,
  HyperlinkBubbleMenuExtension,
  HyperlinkButton,
  HyperLinkBubbleMenu,
  TableButton,
  TableBubbleMenu,
  TextAlignButton,
  TableBubbleMenuExtension,
  ImageExtension,
  KnowledgeExtension,
  type CustomHTMLElement
};
