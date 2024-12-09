import { Editor } from "@tiptap/core";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Gapcursor from "@tiptap/extension-gapcursor";
import Bold from "@tiptap/extension-bold";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

let editor = null;

window.onload = () => {
  const $readonlyToggleButton = document.querySelector("#readonly");
  $readonlyToggleButton.addEventListener("click", toggleReadonly);


  initializeEditor();
};

function initializeEditor() {
  const $element = document.querySelector(".text-area");

  editor = new Editor({
    element: $element,
    content: "Ich mag Züge",
    editable: true,
    extensions: [
      Document,
      Paragraph,
      Text,
      Gapcursor,
      Bold,
      Color,
      TextStyle
    ]
  });

  const $boldButton = document.querySelector("bold-button");
  $boldButton.editor = editor;

  const $fontColorButton = document.querySelector("font-color-button");
  $fontColorButton.editor = editor;
}

function toggleReadonly() {
  editor.setEditable(!editor.options.editable);

  const $boldButton = document.querySelector("bold-button");
  $boldButton.editor = null;
  $boldButton.editor = editor;
}
