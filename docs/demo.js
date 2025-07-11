import { Editor } from "https://esm.sh/@tiptap/core";
import { ImageExtension, SelectionDecoration, TableBubbleMenuExtension, ExtendedHighlight } from "https://esm.sh/@samhammer/tiptob/extensions.js";
import Bold from "https://esm.sh/@tiptap/extension-bold";
import BulletList from "https://esm.sh/@tiptap/extension-bullet-list";
import Color from "https://esm.sh/@tiptap/extension-color";
import Document from "https://esm.sh/@tiptap/extension-document";
import Gapcursor from "https://esm.sh/@tiptap/extension-gapcursor";
import HardBreak from "https://esm.sh/@tiptap/extension-hard-break";
import History from "https://esm.sh/@tiptap/extension-history";
import Italic from "https://esm.sh/@tiptap/extension-italic";
import Link from "https://esm.sh/@tiptap/extension-link";
import ListItem from "https://esm.sh/@tiptap/extension-list-item";
import OrderdList from "https://esm.sh/@tiptap/extension-ordered-list";
import Paragraph from "https://esm.sh/@tiptap/extension-paragraph";
import Strike from "https://esm.sh/@tiptap/extension-strike";
import Table from "https://esm.sh/@tiptap/extension-table";
import TableCell from "https://esm.sh/@tiptap/extension-table-cell";
import TableHeader from "https://esm.sh/@tiptap/extension-table-header";
import TableRow from "https://esm.sh/@tiptap/extension-table-row";
import Text from "https://esm.sh/@tiptap/extension-text";
import TextAlign from "https://esm.sh/@tiptap/extension-text-align";
import TextStyle from "https://esm.sh/@tiptap/extension-text-style";
import Underline from "https://esm.sh/@tiptap/extension-underline";

function uploadInlineImage(file) {
  // Replace this with your actual upload logic
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate upload and return a dummy URL
      resolve('https://your.cdn.com/' + file.name);
    }, 1000);
  });
}
var tableBubbleMenu = document.querySelector("tiptob-table-bubble-menu");

const editor = new Editor({
  element: document.querySelector(".text-area") || undefined,
  content: "<p>Hello World! 🌍</p>",
  extensions: [
    Paragraph,
    Text,
    TextStyle.configure({ mergeNestedSpanStyles: true }),
    Color,
    Document,
    Gapcursor,
    Bold,
    Italic,
    ListItem,
    HardBreak,
    BulletList,
    ExtendedHighlight.configure({
      multicolor: true,
    }),
    OrderdList,
    History,
    Strike,
    Underline,
    Table,
    TableRow,
    TableHeader,
    TableCell,
    SelectionDecoration,
    ImageExtension(uploadInlineImage.bind(this)),
    TableBubbleMenuExtension(() => editor),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Link.configure({
      openOnClick: false,
      defaultProtocol: "https",
      protocols: ["https"],
    }),
  ],
});

document.querySelector("tiptob-bold-button").editor = editor;
document.querySelector("tiptob-italic-button").editor = editor;
document.querySelector("tiptob-underline-button").editor = editor;
document.querySelector("tiptob-strike-button").editor = editor;
document.querySelector("tiptob-font-color-button").editor = editor;
document.querySelector("tiptob-font-highlight-button").editor = editor;
document.querySelector("tiptob-text-align-button").editor = editor;
document.querySelector("tiptob-bullet-list-button").editor = editor;
document.querySelector("tiptob-ordered-list-button").editor = editor;
document.querySelector("tiptob-hyperlink-button").editor = editor;
document.querySelector("tiptob-image-button").editor = editor;
document.querySelector("tiptob-image-button").imageUpload = uploadInlineImage.bind(this);
document.querySelector("tiptob-table-button").editor = editor;
document.querySelector("tiptob-undo-button").editor = editor;
document.querySelector("tiptob-redo-button").editor = editor;
document.querySelector("tiptob-remove-format-button").editor = editor;
document.querySelector("tiptob-show-source-button").editor = editor;
document.querySelector("tiptob-show-html-button").editor = editor;
tableBubbleMenu.editor = editor;
