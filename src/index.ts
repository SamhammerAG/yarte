import BoldButton from "./plugins/Bold/BoldAction.svelte";
import FontColorButton from "./plugins/FontColor/FontColorAction.svelte";
import TableButton from "./plugins/Table/TableAction.svelte";
import TableBubbleMenu from "./plugins/Table/TableMenu.svelte";
import BulletListButton from "./plugins/BulletList/BulletListAction.svelte";
import FontHighlightButton from "./plugins/FontHighlight/FontHighlightAction.svelte";
import FontHighlightExtension from "./plugins/FontHighlight/FontHighlightExtension";
import { getTableExtensions, getBubbleMenuExtension } from "./plugins/Table/TableExtension";
import ImageExtension from "./plugins/Image/ImageExtension";
import ImageButton from "./plugins/Image/ImageUploadAction.svelte";
import ItalicButton from "./plugins/Italic/ItalicAction.svelte";
import KnowledgeButton from "./plugins/KnowledgeMark/KnowledgeMarkAction.svelte";
import KnowledgeExtension from "./plugins/KnowledgeMark/KnowledgeMarkExtension";
import OrderedListButton from "./plugins/OrderedList/OrderedListAction.svelte";
import RedoButton from "./plugins/Redo/RedoAction.svelte";
import RemoveFormatButton from "./plugins/RemoveFormat/RemoveFormatAction.svelte";
import StrikeButton from "./plugins/Strikethrough/StrikeAction.svelte";
import TextAlignButton from "./plugins/TextAlign/TextAlignAction.svelte";
import TextAlignExtension from "./plugins/TextAlign/TextAlignExtension";
import UnderlineButton from "./plugins/Underline/UnderlineAction.svelte";
import UndoButton from "./plugins/Undo/UndoAction.svelte";

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
  TextAlignButton,

  TableButton,
  TableBubbleMenu,

  FontHighlightExtension,
  getTableExtensions as TableExtensions,
  getBubbleMenuExtension as TableBubbleMenuExtension,
  ImageExtension,
  KnowledgeExtension,
  TextAlignExtension
};
