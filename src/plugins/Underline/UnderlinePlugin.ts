import Underline from "@tiptap/extension-underline";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import UnderlineAction from "./UnderlineAction.svelte";

export const UnderlinePlugin: EditorPlugin = {
    extensions: [Underline],
    toolbarButton: UnderlineAction
}