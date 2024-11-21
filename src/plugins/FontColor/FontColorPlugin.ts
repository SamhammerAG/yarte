import Color from "@tiptap/extension-color";
import FontColorAction from "./FontColorAction.svelte";
import TextStyle from "@tiptap/extension-text-style";
import { EditorPlugin } from "../../../types/EditorPlugin";



export class FontColorPlugin extends EditorPlugin {

    public toolbarButton: { component: any; properties?: any; } = {
        component: FontColorAction
    };

    public extensions = [Color, TextStyle];
    public name = "fontColor";
}

/*
export const FontColorPlugin: EditorPlugin = {
    toolbarButton: FontColorAction,
    extensions: [Color, TextStyle],
    name: "fontColor"
};
*/