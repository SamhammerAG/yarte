import type { Extensions } from "@tiptap/core";
import { EditorPlugin } from "../EditorPlugin";
import RemoveFormatAction from "./RemoveFormatAction.svelte";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class RemoveFormatPlugin extends EditorPlugin {

    public name = "removeFormat";
    public toolbarButton: PluginToolbarButton = {
        component: RemoveFormatAction
    }

    public getExtensions(): Extensions {
        return [];
    }
}