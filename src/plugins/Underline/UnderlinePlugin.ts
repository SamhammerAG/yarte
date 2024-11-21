import Underline from "@tiptap/extension-underline";
import { EditorPlugin } from "../../../types/EditorPlugin";
import UnderlineAction from "./UnderlineAction.svelte";

export class UnderlinePlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: UnderlineAction
    };

    protected extensions = [Underline];
    protected name = "underline";
}

/*
export const UnderlinePlugin: EditorPlugin = {
    extensions: [Underline],
    toolbarButton: UnderlineAction,
    name: "underline"
}
    */