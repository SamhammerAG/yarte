import TextAlign from "@tiptap/extension-text-align";
import { EditorPlugin } from "../../../types/EditorPlugin";
import TextAlignAction from "./TextAlignAction.svelte";


export class TextAlignPlugin extends EditorPlugin {
    public toolbarButton: { component: any, properties?: any } = {
        component: TextAlignAction,
    };

    public extensions = [TextAlign.configure({
        types: ["heading", "paragraph"]
    })];

    public name = "textAlignment"
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