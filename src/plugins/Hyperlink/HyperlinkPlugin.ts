import { Extension } from "@tiptap/core";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { PluginKey } from "@tiptap/pm/state";

let showBubbleMenu = false;

export function HyperlinkBubbleMenuExtension(): Extension {
  return BubbleMenu.configure({
    pluginKey: new PluginKey("hyperlinkBubbleMenu"),
    tippyOptions: {
      hideOnClick: true,
      placement: "bottom",
      onShown: () => {
        const bubbleMenu = document.querySelector("yarte-hyperlink-bubble-menu") as HTMLElement;
        const textarea = bubbleMenu?.shadowRoot.querySelector("input") as HTMLInputElement;
        if (textarea) {
          textarea.focus();
        }
      }
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
