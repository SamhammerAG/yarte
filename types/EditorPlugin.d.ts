import { Extensions } from "@tiptap/core";
import type { SvelteComponent } from "svelte";

export type EditorPlugin = {
    name: string,
    toolbarButton: any,
    bubbleMenu?: any,
    extensions: Extensions
};