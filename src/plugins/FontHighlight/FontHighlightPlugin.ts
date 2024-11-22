import Highlight from "@tiptap/extension-highlight";
import { EditorPlugin } from "../EditorPlugin";
import FontHighlightAction from "./FontHighlightAction.svelte";
import type { Extensions, Mark } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class FontHighlightPlugin extends EditorPlugin {

    public name = "fontHighlight"
    public toolbarButton: PluginToolbarButton = {
        component: FontHighlightAction
    };

    public getExtensions(): Extensions {
        return [this.getHighlightExtension()];
    }

    private getHighlightExtension(): Mark {
        return Highlight.configure({
            multicolor: true
        });
    }
}