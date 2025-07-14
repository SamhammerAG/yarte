import BubbleMenu from "@tiptap/extension-bubble-menu";
import { Editor, Extension, NodePos } from "@tiptap/core";
import { PluginKey } from "@tiptap/pm/state";
import type { InlineOptions } from "@floating-ui/dom";


export function getBubbleMenuExtension(getEditor: () => Editor): Extension {
  return BubbleMenu.configure({
    pluginKey: new PluginKey("tableBubbleMenu"),
    options: {
      inline: calcRect(getEditor)
    },
    shouldShow: ({ editor }) => {
      return editor.isEditable && editor.isActive("table") && !editor.isActive("link");
    },
    element: document.querySelector("tiptob-table-bubble-menu"),
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

function calcRect(getEditor: () => Editor): InlineOptions {
  const { state } = getEditor();
  const myNodePos = new NodePos(state.selection.$anchor, getEditor());
  const tableElement = findParentTableFromPos(myNodePos);

  if (tableElement) {
    return tableElement.getBoundingClientRect();
  }

  return {
    x: 0,
    y: 0,
  };
}
