import TextAlign from "@tiptap/extension-text-align";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import TextAlignAction from "./TextAlignAction.svelte";


export const TextAlignPlugin: EditorPlugin = {
    toolbarButton: TextAlignAction,
    extensions: [TextAlign.configure({
        types: ["heading", "paragraph"]
    })]
};