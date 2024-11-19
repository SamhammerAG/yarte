import History from "@tiptap/extension-history";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import RedoAction from "./RedoAction.svelte";

export const RedoPlugin: EditorPlugin = {
    toolbarButton: RedoAction,
    extensions: [History],
    name: "redo"
};