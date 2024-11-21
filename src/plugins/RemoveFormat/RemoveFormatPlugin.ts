import { EditorPlugin } from "../../../types/EditorPlugin";
import RemoveFormatAction from "./RemoveFormatAction.svelte";

export class RemoveFormatPlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: RemoveFormatAction
    }

    protected extensions = []
    protected name = "removeFormat";
}

/*
export const RemoveFormatPlugin: EditorPlugin = {
    toolbarButton: RemoveFormatAction,
    extensions: [],
    name: "removeFormat"
};
*/