
import type { EditorPlugin } from "../../../types/EditorPlugin";
import Bold from "@tiptap/extension-bold";
import BoldAction from "./BoldAction.svelte";

export const BoldPlugin: EditorPlugin = {
    toolbarButton: BoldAction,
    extensions: [Bold],
    name: "bold"
}