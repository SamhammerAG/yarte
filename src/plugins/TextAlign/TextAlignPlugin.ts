import TextAlign from "@tiptap/extension-text-align";
import { EditorPlugin } from "../../../types/EditorPlugin";
import TextAlignAction from "./TextAlignAction.svelte";


export class TextAlignPlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: TextAlignAction,
    };

    protected extensions = [TextAlign.configure({
        types: ["heading", "paragraph"]
    })];

    protected name = "textAlignment"
}

/*
export const TextAlignPlugin: EditorPlugin = {
    toolbarButton: TextAlignAction,
    extensions: [TextAlign.configure({
        types: ["heading", "paragraph"]
    })],
    name: "textAlignment"
};
*/