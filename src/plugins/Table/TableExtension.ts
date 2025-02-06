import Table from "@tiptap/extension-table";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { Editor, Extension, NodePos, posToDOMRect, type Extensions } from "@tiptap/core";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

export function getTableExtensions(): Extensions {
  return [TableRow, TableHeader, TableCell, Table.configure({
    resizable: true
  })];
}

export function getBubbleMenuExtension(getEditor: () => Editor): Extension {
  return BubbleMenu.configure({
    pluginKey: "bubbleMenuTable",
    tippyOptions: {
      animation: true,
      placement: "bottom",
      getReferenceClientRect: () => {
        const { state, view } = getEditor();
        const myNodePos = new NodePos(state.selection.$anchor, getEditor());
        const tableElement = findParentTableFromPos(myNodePos);
        if (tableElement) {
          return tableElement.getBoundingClientRect();
        }

        return posToDOMRect(view, 0, 0);
      },
    },
    shouldShow: ({ editor }) => {
      return editor.isEditable && editor.isActive("table")
    },
    element: document.querySelector("table-bubble-menu"),
  });
}

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

/*
export default class TableExtensions {

  public getTableExtension(): Node {
    return Table.configure({
      resizable: true
    });
  }

  public getBubbleMenuExtension(element: HTMLElement, editor: Editor): Extension {
    return BubbleMenu.configure({
      pluginKey: "bubbleMenuTable",
      tippyOptions: {
        animation: true,
        placement: "bottom",
        getReferenceClientRect: () => {
          const { state, view } = editor;
          const myNodePos = new NodePos(state.selection.$anchor, editor);
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
*/
