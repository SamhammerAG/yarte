import type { Extension } from "@tiptap/core";
import BubbleMenu from "@tiptap/extension-bubble-menu";

let showBubbleMenu = false;

export function HyperlinkBubbleMenuExtension(): Extension {
  return BubbleMenu.configure({
    pluginKey: "hyperlinkBubbleMenu",
    tippyOptions: {
      hideOnClick: true,
      placement: "bottom",
    },
    shouldShow: ({ editor }) => {
      return editor.isEditable && (editor.isActive("link") || showBubbleMenu)
    },
    element: document.querySelector("yarte-hyperlink-bubble-menu") as HTMLElement,
  });
}

document.addEventListener("showLinkBubbleMenu", (e: Event) => {
  showBubbleMenu = (e as CustomEvent).detail.show;
});

