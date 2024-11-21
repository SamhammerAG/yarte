import BulletList from "@tiptap/extension-bullet-list";
import { EditorPlugin } from "../../../types/EditorPlugin";
import BulletListAction from "./BulletListAction.svelte";
import ListItem from "@tiptap/extension-list-item";



export class BulletListPlugin extends EditorPlugin {

    protected toolbarButton: { component: any; properties?: any; } = {
        component: BulletListAction,
    };

    protected extensions = [BulletList, ListItem];
    protected name = "bulletList";
}

/*
export const BulletListPlugin: EditorPlugin = {
    toolbarButton: BulletListAction,
    extensions: [BulletList, ListItem],
    name: "bulletList"
};
*/