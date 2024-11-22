import TableRow from "@tiptap/extension-table-row";
import { EditorPlugin } from "../EditorPlugin";
import TableAction from "./TableAction.svelte";
import TableMenu from "./TableMenu.svelte";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Table from "@tiptap/extension-table";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { type Editor, Extension, type Extensions, Node, NodePos, posToDOMRect } from "@tiptap/core";
import type { PluginBubbleMenu, PluginToolbarButton } from "../../../types/PluginTypes";

export class TablePlugin extends EditorPlugin {

    public name = "table";

    public toolbarButton: PluginToolbarButton = {
        component: TableAction
    };

    public bubbleMenu: PluginBubbleMenu = {
        component: TableMenu,
        element: undefined
    };

    public getExtensions(editor: Editor): Extensions {
        return [this.getTableExtension(), TableRow, TableCell, TableHeader, this.getBubbleMenuExtension(editor, this.bubbleMenu.element)]
    }

    private getTableExtension(): Node {
        return Table.configure({
            resizable: true
        });
    }

    private getBubbleMenuExtension(editor: Editor, element?: HTMLElement): Extension {
        return BubbleMenu.configure({
            pluginKey: "bubbleMenuTable",
            tippyOptions: {
                animation: true,
                placement: "bottom",
                getReferenceClientRect: () => {
                    console.log(editor);
                    const { state, view } = editor;

                    const myNodePos = new NodePos(state.selection.$anchor, editor);
                    let tableElement = this.findParentTableFromPos(myNodePos);

                    if (tableElement) {
                        return tableElement.getBoundingClientRect();
                    }

                    return posToDOMRect(view, 0, 0);
                },
            },
            shouldShow: ({ editor }) => {
                console.log(editor.isEditable, editor.isActive("table"));
                return editor.isEditable && editor.isActive("table")
            },
            element: element,
        });
    }

    private findParentTableFromPos(nodePos: NodePos): Element | null {
        if (nodePos.node.type.name === "table") {
            return nodePos.element;
        }
        const parentNode = nodePos.parent;
        if (parentNode) {
            return this.findParentTableFromPos(parentNode);
        }
        return null;
    }
}
