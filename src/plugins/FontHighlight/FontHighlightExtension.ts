import type { Mark } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";

export default function getFontHighlightExtension(): Mark {
  return Highlight.configure({
    multicolor: true
  });
}
