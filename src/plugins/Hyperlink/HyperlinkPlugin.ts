import Link from "@tiptap/extension-link";
import BubbleMenu from "@tiptap/extension-bubble-menu";

let showBubbleMenu = false;

const LinkExtension = Link.configure({
  openOnClick: false,
});

const HyperlinkPlugin = BubbleMenu.configure({
  pluginKey: "bubbleMenuHyperlink",
  tippyOptions: {
    hideOnClick: true,
    placement: "bottom",
  },
  shouldShow: ({ editor }) => {
    return editor.isEditable && (editor.isActive("link") || showBubbleMenu)
  },
  element: document.querySelector("hyperlink-menu"),
});

document.addEventListener("showLinkBubbleMenu", (e: Event) => {
  showBubbleMenu = (e as CustomEvent).detail.show;
});

export { LinkExtension, HyperlinkPlugin };
