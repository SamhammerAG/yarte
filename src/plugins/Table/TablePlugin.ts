import TableRow from "@tiptap/extension-table-row";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import TableAction from "./TableAction.svelte";
import TableMenu from "./TableMenu.svelte";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Table from "@tiptap/extension-table";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import type { NodePos } from "@tiptap/core";

export const TablePlugin: (getReferenceClientRect: Function, shouldShow: Function, element: HTMLElement) => EditorPlugin =
    (getReferenceClientRect: Function, shouldShow: Function, element: HTMLElement) => {
        return {
            toolbarButton: TableAction,
            bubbleMenu: TableMenu,
            extensions: [getTableExtension(), TableRow, TableCell, TableHeader, getConfiguredBubbleMenu(getReferenceClientRect, shouldShow, element)],
            name: "table"
        }
    };

function getTableExtension() {
    return Table.configure({ resizable: true });
};

function getConfiguredBubbleMenu(getReferenceClientRect: Function, shouldShow: Function, element: HTMLElement) {
    return BubbleMenu.configure({
        pluginKey: "bubbleMenuTable",
        tippyOptions: {
            animation: true,
            placement: "bottom",
            getReferenceClientRect: () => getReferenceClientRect(),
        },
        shouldShow: () => shouldShow(),
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