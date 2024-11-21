import type { Editor, Extensions } from "@tiptap/core";


export class EditorPlugin {

    protected editor: Editor;
    protected name: string = "";
    protected toolbarButton: { component: any, properties?: any } = { component: null };
    protected extensions: Extensions = [];

    protected bubbleMenu?: any;

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