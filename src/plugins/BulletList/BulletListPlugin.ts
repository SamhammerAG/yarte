import BulletList from "@tiptap/extension-bullet-list";
import { EditorPlugin } from "../../../types/EditorPlugin";
import BulletListAction from "./BulletListAction.svelte";
import ListItem from "@tiptap/extension-list-item";



export class BulletListPlugin extends EditorPlugin {

    public toolbarButton: { component: any; properties?: any; } = {
        component: BulletListAction,
    };

    public extensions = [BulletList, ListItem];
    public name = "bulletList";
}

/*
export const BulletListPlugin: EditorPlugin = {
    toolbarButton: BulletListAction,
    extensions: [BulletList, ListItem],
    name: "bulletList"
};
*/