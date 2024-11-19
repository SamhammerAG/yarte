import History from "@tiptap/extension-history";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import UndoAction from "./UndoAction.svelte";


export const UndoPlugin: EditorPlugin = {
    toolbarButton: UndoAction,
    extensions: [History],
    name: "undo"
};