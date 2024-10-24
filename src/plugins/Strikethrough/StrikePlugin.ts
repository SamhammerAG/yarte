import Strike from "@tiptap/extension-strike";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import StrikeAction from "./StrikeAction.svelte";

export const StrikePlugin: EditorPlugin = {
    extensions: [Strike],
    toolbarButton: StrikeAction
}