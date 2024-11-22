
import { EditorPlugin } from "../EditorPlugin";
import Bold from "@tiptap/extension-bold";
import BoldAction from "./BoldAction.svelte";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class BoldPlugin extends EditorPlugin {

    public name = "bold";
    public toolbarButton: PluginToolbarButton = {
        component: BoldAction
    };

    public getExtensions(): Extensions {
        return [Bold];
    }
}