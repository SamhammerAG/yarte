import BulletList from "@tiptap/extension-bullet-list";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import BulletListAction from "./BulletListAction.svelte";
import ListItem from "@tiptap/extension-list-item";


export const BulletListPlugin: EditorPlugin = {
    toolbarButton: BulletListAction,
    extensions: [BulletList, ListItem]
};