import Color from "@tiptap/extension-color";
import FontColorAction from "./FontColorAction.svelte";
import TextStyle from "@tiptap/extension-text-style";
import { EditorPlugin } from "../EditorPlugin";
import type { PluginToolbarButton } from "../../../types/PluginTypes";
import type { Extensions } from "@tiptap/core";

export class FontColorPlugin extends EditorPlugin {

    public name = "fontColor";
    public toolbarButton: PluginToolbarButton = {
        component: FontColorAction
    };

    public getExtensions(): Extensions {
        return [Color, TextStyle];
    }
}