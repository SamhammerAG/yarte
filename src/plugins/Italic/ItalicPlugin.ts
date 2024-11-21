import Italic from "@tiptap/extension-italic";
import ItalicAction from "./ItalicAction.svelte";
import { EditorPlugin } from "../../../types/EditorPlugin";


export class ItalicPlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: ItalicAction,
    };

    protected extensions = [Italic];
    protected name = "italic";
}

/*
export const ItalicPlugin: EditorPlugin = {
    toolbarButton: ItalicAction,
    extensions: [Italic],
    name: "italic"
};
*/