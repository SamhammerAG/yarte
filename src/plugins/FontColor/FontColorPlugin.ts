import Color from "@tiptap/extension-color";
import FontColorAction from "./FontColorAction.svelte";
import TextStyle from "@tiptap/extension-text-style";
import { EditorPlugin } from "../../../types/EditorPlugin";



export class FontColorPlugin extends EditorPlugin {

    protected toolbarButton: { component: any; properties?: any; } = {
        component: FontColorAction
    };

    protected extensions = [Color, TextStyle];
    protected name = "fontColor";
}

/*
export const FontColorPlugin: EditorPlugin = {
    toolbarButton: FontColorAction,
    extensions: [Color, TextStyle],
    name: "fontColor"
};
*/