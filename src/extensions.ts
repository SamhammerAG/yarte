import ImageExtension from "./plugins/Image/ImageExtension";
import KnowledgeExtension from "./plugins/KnowledgeMark/KnowledgeMarkExtension";
import { getBubbleMenuExtension as TableBubbleMenuExtension } from "./plugins/Table/TableExtension";
import { SelectionDecoration } from "./plugins/Selection/SelectionPlugin";
import type { Editor } from "@tiptap/core";

interface CustomHTMLElement extends HTMLElement {
  editor: Editor;
  imageUpload: (file: File) => Promise<string>;
}

export {
  ImageExtension,
  KnowledgeExtension,
  SelectionDecoration,
  TableBubbleMenuExtension,
  type CustomHTMLElement
};
