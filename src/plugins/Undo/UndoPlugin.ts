import History from "@tiptap/extension-history";
import { EditorPlugin } from "../../../types/EditorPlugin";
import UndoAction from "./UndoAction.svelte";


export class UndoPlugin extends EditorPlugin {
    public toolbarButton: { component: any, properties?: any } = {
        component: UndoAction
    };

    public extensions = [History];
    public name = "undo";
}

/*
export const UndoPlugin: EditorPlugin = {
    toolbarButton: UndoAction,
    extensions: [History],
    name: "undo"
};
*/