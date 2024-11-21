import Highlight from "@tiptap/extension-highlight";
import { EditorPlugin } from "../../../types/EditorPlugin";
import FontHighlightAction from "./FontHighlightAction.svelte";


export class FontHighlightPlugin extends EditorPlugin {
    protected toolbarButton: { component: any; properties?: any; } = {
        component: FontHighlightAction
    };

    protected extensions = [Highlight.configure({
        multicolor: true
    })];

    protected name = "fontHighlight"
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