import { Extensions } from "@tiptap/core";
import type { SvelteComponent } from "svelte";

export type EditorPlugin = {
    toolbarButton: HTMLComponent,
    bubbleMenu?: HTMLComponent,
    extensions: Extensions
};