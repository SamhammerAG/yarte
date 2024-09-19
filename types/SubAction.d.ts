import type { Editor, Extension, Mark, Node } from "@tiptap/core";

export type Subaction = {
    key: string;
    buttonIcon: string;
    buttonAction: (editor: Editor, ...params: any[]) => void;
    extensions: Array<Node<any> | Mark<any> | Extension<any>>;
    buttonAction2?: (editor: Editor, ...params: any[]) => void;
};
