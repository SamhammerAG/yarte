import { EditorPlugin } from "../../../types/EditorPlugin";
import RemoveFormatAction from "./RemoveFormatAction.svelte";

export class RemoveFormatPlugin extends EditorPlugin {
    public toolbarButton: { component: any, properties?: any } = {
        component: RemoveFormatAction
    }

    public extensions = []
    public name = "removeFormat";
}

/*
export const RemoveFormatPlugin: EditorPlugin = {
    toolbarButton: RemoveFormatAction,
    extensions: [],
    name: "removeFormat"
};
*/