import Italic from "@tiptap/extension-italic";
import ItalicAction from "./ItalicAction.svelte";
import type { EditorPlugin } from "../../../types/EditorPlugin";

export const ItalicPlugin: EditorPlugin = {
    toolbarButton: ItalicAction,
    extensions: [Italic],
};