import OrderedList from "@tiptap/extension-ordered-list";
import { EditorPlugin } from "../../../types/EditorPlugin";
import NumberedListAction from "./NumberedListAction.svelte";
import ListItem from "@tiptap/extension-list-item";

export class OrderedListPlugin extends EditorPlugin {
    public toolbarButton: { component: any, properties?: any } = {
        component: NumberedListAction,
    };
    public extensions: any = [OrderedList, ListItem];
    public name = "orderedList";
}

/*
export const OrderedListPlugin: EditorPlugin = {
    toolbarButton: NumberedListAction,
    extensions: [OrderedList, ListItem],
    name: "orderedList"
}
    */