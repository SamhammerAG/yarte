import type { Editor, Extensions } from "@tiptap/core";


export class EditorPlugin {

    protected editor: Editor;
    public name: string = "";
    public toolbarButton: { component: any, customProperties?: any } = { component: null };
    public extensions: Extensions = [];

    public bubbleMenu?: any;

    constructor(editor: Editor) {
        this.editor = editor;
    }
}

/*
export type EditorPlugin = {
    name: string,
    toolbarButton: { component: any, properties?: any },
    bubbleMenu?: any,
    extensions: Extensions,
};
*/