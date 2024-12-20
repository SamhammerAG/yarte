import TableRow from "@tiptap/extension-table-row";
import { EditorPlugin } from "../EditorPlugin";
import TableAction from "./TableAction.svelte";
import TableMenu from "./TableMenu.svelte";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Table from "@tiptap/extension-table";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { Extension, type Extensions, Node, NodePos, posToDOMRect } from "@tiptap/core";
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

  public getExtensions(): Extensions {
    return [this.getTableExtension(), TableRow, TableCell, TableHeader, this.getBubbleMenuExtension()]
  }

  private getTableExtension(): Node {
    return Table.configure({
      resizable: true
    });
  }

  private getBubbleMenuExtension(): Extension {
    return BubbleMenu.configure({
      pluginKey: "bubbleMenuTable",
      tippyOptions: {
        animation: true,
        placement: "bottom",
        getReferenceClientRect: () => {
          const { state, view } = this.getEditor();
          const myNodePos = new NodePos(state.selection.$anchor, this.getEditor());
          const tableElement = this.findParentTableFromPos(myNodePos);

          if (tableElement) {
            return tableElement.getBoundingClientRect();
          }

          return posToDOMRect(view, 0, 0);
        },
      },
      shouldShow: ({ editor }) => {
        return editor.isEditable && editor.isActive("table")
      },
      element: this.bubbleMenu.element,
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
