import Link from "@tiptap/extension-link";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import HyperlinkAction from "./HyperlinkAction.svelte";
import HyperLinkMenu from "./HyperLinkMenu.svelte";
import BubbleMenu from "@tiptap/extension-bubble-menu";

export const HyperlinkPlugin: (setCurrentLink: Function, shouldShow: Function, element: HTMLElement) => EditorPlugin =
    (setCurrentLink: Function, shouldShow: Function, element: HTMLElement): EditorPlugin => {
        return {
            toolbarButton: HyperlinkAction,
            bubbleMenu: HyperLinkMenu,
            extensions: [
                getLinkExtension(),
                getConfiguredBubbleMenu(setCurrentLink, shouldShow, element)]
        }
    };

function getLinkExtension() {
    return Link.configure({
        openOnClick: false
    });
};

function getConfiguredBubbleMenu(setCurrentLink: Function, shouldShow: Function, element: HTMLElement) {
    return BubbleMenu.configure({
        pluginKey: "bubbleMenuHyperlink",
        tippyOptions: {
            placement: "bottom",
            onShow: () => setCurrentLink(),
        },
        shouldShow: () => shouldShow(),
        element: element,
    });
};