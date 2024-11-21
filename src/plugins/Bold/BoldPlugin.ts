
import { EditorPlugin } from "../../../types/EditorPlugin";
import Bold from "@tiptap/extension-bold";
import BoldAction from "./BoldAction.svelte";


export class BoldPlugin extends EditorPlugin {
    protected toolbarButton: { component: any; properties?: any; } = {
        component: BoldAction
    };

    protected extensions = [Bold];
    protected name = "bold";
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