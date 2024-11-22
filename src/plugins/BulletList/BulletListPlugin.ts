import BulletList from "@tiptap/extension-bullet-list";
import { EditorPlugin } from "../EditorPlugin";
import BulletListAction from "./BulletListAction.svelte";
import ListItem from "@tiptap/extension-list-item";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class BulletListPlugin extends EditorPlugin {

    public name = "bulletList";
    public toolbarButton: PluginToolbarButton = {
        component: BulletListAction,
    };

    public getExtensions(): Extensions {
        return [BulletList, ListItem];
    }
}