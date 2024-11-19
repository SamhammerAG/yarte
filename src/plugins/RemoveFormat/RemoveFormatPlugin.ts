import type { EditorPlugin } from "../../../types/EditorPlugin";
import RemoveFormatAction from "./RemoveFormatAction.svelte";



export const RemoveFormatPlugin: EditorPlugin = {
    toolbarButton: RemoveFormatAction,
    extensions: [],
    name: "removeFormat"
};