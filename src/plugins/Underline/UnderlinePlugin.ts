import Underline from "@tiptap/extension-underline";
import { EditorPlugin } from "../EditorPlugin";
import UnderlineAction from "./UnderlineAction.svelte";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class UnderlinePlugin extends EditorPlugin {

    public name = "underline";
    public toolbarButton: PluginToolbarButton = {
        component: UnderlineAction
    };

    public getExtensions(): Extensions {
        return [Underline];
    }
}