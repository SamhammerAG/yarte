import OrderedList from "@tiptap/extension-ordered-list";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import NumberedListAction from "./NumberedListAction.svelte";
import ListItem from "@tiptap/extension-list-item";


export const OrderedListPlugin: EditorPlugin = {
    toolbarButton: NumberedListAction,
    extensions: [OrderedList, ListItem],
}