import BubbleMenu from "@tiptap/extension-bubble-menu";
import { Editor, Extension, NodePos, posToDOMRect } from "@tiptap/core";


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
