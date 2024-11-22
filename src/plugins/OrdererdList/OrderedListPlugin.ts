import OrderedList from "@tiptap/extension-ordered-list";
import { EditorPlugin } from "../EditorPlugin";
import NumberedListAction from "./NumberedListAction.svelte";
import ListItem from "@tiptap/extension-list-item";
import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class OrderedListPlugin extends EditorPlugin {

    public name = "orderedList";
    public toolbarButton: PluginToolbarButton = {
        component: NumberedListAction,
    };

    public getExtensions(): Extensions {
        return [OrderedList, ListItem];
    }
}