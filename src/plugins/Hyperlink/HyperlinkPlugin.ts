import BubbleMenu from "@tiptap/extension-bubble-menu";

let showBubbleMenu = false;

const HyperlinkBubbleMenuExtension = BubbleMenu.configure({
  pluginKey: "bubbleMenuHyperlink",
  tippyOptions: {
    hideOnClick: true,
    placement: "bottom",
  },
  shouldShow: ({ editor }) => {
    return editor.isEditable && (editor.isActive("link") && editor.isActive("table") || showBubbleMenu)
  },
  element: document.querySelector("hyperlink-bubble-menu"),
});

document.addEventListener("showLinkBubbleMenu", (e: Event) => {
  showBubbleMenu = (e as CustomEvent).detail.show;
});

export default HyperlinkBubbleMenuExtension;
