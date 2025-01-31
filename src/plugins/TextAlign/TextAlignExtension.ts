import TextAlign from "@tiptap/extension-text-align";
import type { Extension } from "@tiptap/core";

export default function getTextAlignExtension(): Extension {
  return TextAlign.configure({
    types: ["heading", "paragraph"]
  });
}
