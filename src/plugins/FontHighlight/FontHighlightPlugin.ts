import Highlight from "@tiptap/extension-highlight";
import { EditorPlugin } from "../../../types/EditorPlugin";
import FontHighlightAction from "./FontHighlightAction.svelte";


export class FontHighlightPlugin extends EditorPlugin {
    public toolbarButton: { component: any; properties?: any; } = {
        component: FontHighlightAction
    };

    public extensions = [Highlight.configure({
        multicolor: true
    })];

    public name = "fontHighlight"
}

/*
export const FontHighlightPlugin: EditorPlugin = {
    toolbarButton: FontHighlightAction,
    extensions: [Highlight.configure({
        multicolor: true
    })],
    name: "fontHighlight"
};
*/