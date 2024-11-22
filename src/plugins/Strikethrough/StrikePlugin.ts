import Strike from "@tiptap/extension-strike";
import { EditorPlugin } from "../EditorPlugin";
import StrikeAction from "./StrikeAction.svelte";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class StrikePlugin extends EditorPlugin {

    public name = "strike";
    public toolbarButton: PluginToolbarButton = {
        component: StrikeAction
    };

    public getExtensions(): Extensions {
        return [Strike];
    }
}