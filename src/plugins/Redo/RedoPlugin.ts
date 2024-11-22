import History from "@tiptap/extension-history";
import { EditorPlugin } from "../EditorPlugin";
import RedoAction from "./RedoAction.svelte";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";


export class RedoPlugin extends EditorPlugin {

    public name = "redo";
    public toolbarButton: PluginToolbarButton = {
        component: RedoAction,
    };

    public getExtensions(): Extensions {
        return [History];
    }
}