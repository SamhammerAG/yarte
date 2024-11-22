import History from "@tiptap/extension-history";
import { EditorPlugin } from "../EditorPlugin";
import UndoAction from "./UndoAction.svelte";
import type { PluginToolbarButton } from "../../../types/PluginTypes";
import type { Extensions } from "@tiptap/core";

export class UndoPlugin extends EditorPlugin {

    public name = "undo";
    public toolbarButton: PluginToolbarButton = {
        component: UndoAction
    };

    public getExtensions(): Extensions {
        return [History];
    }
}