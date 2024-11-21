import TableRow from "@tiptap/extension-table-row";
import { EditorPlugin } from "../../../types/EditorPlugin";
import TableAction from "./TableAction.svelte";
import TableMenu from "./TableMenu.svelte";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Table from "@tiptap/extension-table";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { type Editor, type Extensions, NodePos, posToDOMRect } from "@tiptap/core";


export class TablePlugin extends EditorPlugin {
    protected toolbarButton: { component: any, properties?: any } = {
        component: TableAction
    };

    protected name = "table";
    protected extensions: Extensions = [];
    protected bubbleMenu: any = TableMenu;

    constructor(editor: Editor, element: HTMLElement) {
        super(editor);
        this.extensions = [getTableExtension(), TableRow, TableCell, TableHeader, getConfiguredBubbleMenu(this.editor, element)];
    }

}

/*
export const TablePlugin: (getReferenceClientRect: Function, shouldShow: Function, element: HTMLElement) => EditorPlugin =
    (getReferenceClientRect: Function, shouldShow: Function, element: HTMLElement) => {
        return {
            toolbarButton: TableAction,
            bubbleMenu: TableMenu,
            extensions: [getTableExtension(), TableRow, TableCell, TableHeader, getConfiguredBubbleMenu(this.editor, element)],
            name: "table"
        }
    };
*/

function getTableExtension() {
    return Table.configure({ resizable: true });
};

function getConfiguredBubbleMenu(editor: Editor, element: HTMLElement) {
    return BubbleMenu.configure({
        pluginKey: "bubbleMenuTable",
        tippyOptions: {
            animation: true,
            placement: "bottom",
            getReferenceClientRect: () => {
                const { state, view } = editor;

                const myNodePos = new NodePos(state.selection.$anchor, editor);
                let tableElement = findParentTableFromPos(myNodePos);

                if (tableElement) {
                    return tableElement.getBoundingClientRect();
                }

                return posToDOMRect(view, 0, 0);
            },
        },
        shouldShow: ({ editor }) => editor.isEditable && editor.isActive("table"),
        element: element,
    })
};

function findParentTableFromPos(nodePos: NodePos): Element | null {
    if (nodePos.node.type.name === "table") {
        return nodePos.element;
    }
    const parentNode = nodePos.parent;
    if (parentNode) {
        return findParentTableFromPos(parentNode);
    }
    return null;
}