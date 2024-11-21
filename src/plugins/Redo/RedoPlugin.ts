import History from "@tiptap/extension-history";
import { EditorPlugin } from "../../../types/EditorPlugin";
import RedoAction from "./RedoAction.svelte";


export class RedoPlugin extends EditorPlugin {

    public toolbarButton: { component: any, properties?: any } = {
        component: RedoAction,
    };

    public extensions = [History];
    public name = "redo"

}

/*
export const RedoPlugin: EditorPlugin = {
    toolbarButton: RedoAction,
    extensions: [History],
    name: "redo"
};
*/