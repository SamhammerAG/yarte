import Italic from "@tiptap/extension-italic";
import ItalicAction from "./ItalicAction.svelte";
import { EditorPlugin } from "../../../types/EditorPlugin";


export class ItalicPlugin extends EditorPlugin {
    public toolbarButton: { component: any, properties?: any } = {
        component: ItalicAction,
    };

    public extensions = [Italic];
    public name = "italic";
}

/*
export const ItalicPlugin: EditorPlugin = {
    toolbarButton: ItalicAction,
    extensions: [Italic],
    name: "italic"
};
*/