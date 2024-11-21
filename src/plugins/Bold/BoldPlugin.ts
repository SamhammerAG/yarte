
import { EditorPlugin } from "../../../types/EditorPlugin";
import Bold from "@tiptap/extension-bold";
import BoldAction from "./BoldAction.svelte";


export class BoldPlugin extends EditorPlugin {
    public toolbarButton: { component: any; properties?: any; } = {
        component: BoldAction
    };

    public extensions = [Bold];
    public name = "bold";
}

/*
export const BoldPlugin: EditorPlugin = {
    toolbarButton: {
        component: BoldAction,
    },
    extensions: [Bold],
    name: "bold"
}
*/