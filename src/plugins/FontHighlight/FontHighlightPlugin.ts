import Highlight from "@tiptap/extension-highlight";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import FontHighlightAction from "./FontHighlightAction.svelte";


export const FontHighlightPlugin: EditorPlugin = {
    toolbarButton: FontHighlightAction,
    extensions: [Highlight.configure({
        multicolor: true
    })]
};