import Link from "@tiptap/extension-link";
import { EditorPlugin } from "../../../types/EditorPlugin";
import HyperlinkAction from "./HyperlinkAction.svelte";
import HyperLinkMenu from "./HyperLinkMenu.svelte";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import type { Editor, Extensions } from "@tiptap/core";
import { showLinkBubbleMenu, currentFocusLink } from "./stores";
import { get } from "svelte/store";

export class HyperlinkPlugin extends EditorPlugin {

    public toolbarButton: { component: any; properties?: any } = {
        component: HyperlinkAction,
    };

    public bubbleMenu = HyperLinkMenu;
    public extensions: Extensions = [];
    public name = "hyperlink";

    constructor(editor: Editor) {
        super(editor);

        this.extensions = [
            this.getLinkExtension(),
            this.getConfiguredBubbleMenu(this.editor),
        ];
    }

    private getLinkExtension() {
        return Link.configure({
            openOnClick: false,
        });
    }

    private getConfiguredBubbleMenu(editor: Editor) {
        return BubbleMenu.configure({
            pluginKey: "bubbleMenuHyperlink",
            tippyOptions: {
                placement: "bottom",
                onShow: () => currentFocusLink.set(editor.getAttributes("link").href),
            },
            shouldShow: ({ editor }) =>
                editor.isEditable &&
                (editor.isActive("link") || get(showLinkBubbleMenu)),
            element: this.bubbleMenuElement,
        });
    }
}

