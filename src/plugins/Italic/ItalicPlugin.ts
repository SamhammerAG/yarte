import Italic from "@tiptap/extension-italic";
import ItalicAction from "./ItalicAction.svelte";
import { EditorPlugin } from "../EditorPlugin";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class ItalicPlugin extends EditorPlugin {

    public name = "italic";
    public toolbarButton: PluginToolbarButton = {
        component: ItalicAction,
    };

    public getExtensions(): Extensions {
        return [Italic];
    }
}