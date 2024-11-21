import OrderedList from "@tiptap/extension-ordered-list";
import { EditorPlugin } from "../../../types/EditorPlugin";
import NumberedListAction from "./NumberedListAction.svelte";
import ListItem from "@tiptap/extension-list-item";

export class OrderedListPlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: NumberedListAction,
    };
    protected extensions: any = [OrderedList, ListItem];
    protected name = "orderedList";
}

/*
export const OrderedListPlugin: EditorPlugin = {
    toolbarButton: NumberedListAction,
    extensions: [OrderedList, ListItem],
    name: "orderedList"
}
    */