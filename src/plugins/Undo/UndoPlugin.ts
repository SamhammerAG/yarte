import History from "@tiptap/extension-history";
import { EditorPlugin } from "../../../types/EditorPlugin";
import UndoAction from "./UndoAction.svelte";


export class UndoPlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: UndoAction
    };

    protected extensions = [History];
    protected name = "undo";
}

/*
export const UndoPlugin: EditorPlugin = {
    toolbarButton: UndoAction,
    extensions: [History],
    name: "undo"
};
*/