import Color from "@tiptap/extension-color";
import FontColorAction from "./FontColorAction.svelte";
import TextStyle from "@tiptap/extension-text-style";
import type { EditorPlugin } from "../../../types/EditorPlugin";


export const FontColorPlugin: EditorPlugin = {
    toolbarButton: FontColorAction,
    extensions: [Color, TextStyle],
};