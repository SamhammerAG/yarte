import type { Extension, Mark, Node } from "@tiptap/core";

export type Subaction = {
    key: string;
    buttonIcon: string;
    buttonAction: Function;
    extensions: Array<Node<any> | Mark<any> | Extension<any>>;
};
