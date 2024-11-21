import Strike from "@tiptap/extension-strike";
import { EditorPlugin } from "../../../types/EditorPlugin";
import StrikeAction from "./StrikeAction.svelte";


export class StrikePlugin extends EditorPlugin {
    public toolbarButton: { component: any, properties?: any } = {
        component: StrikeAction
    };

    public extensions = [Strike];
    public name = "strike"
}

/*
export const StrikePlugin: EditorPlugin = {
    extensions: [Strike],
    toolbarButton: StrikeAction,
    name: "strike"
}
    */