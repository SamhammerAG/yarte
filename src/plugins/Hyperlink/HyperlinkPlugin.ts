import Link from "@tiptap/extension-link";
import { EditorPlugin } from "../EditorPlugin";
import HyperlinkAction from "./HyperlinkAction.svelte";
import HyperLinkMenu from "./HyperLinkMenu.svelte";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import type { Editor, Extension, Extensions, Mark } from "@tiptap/core";
import { showLinkBubbleMenu, currentFocusLink } from "./stores";
import { get } from "svelte/store";
import type { PluginBubbleMenu, PluginToolbarButton } from "../../../types/PluginTypes";

export class HyperlinkPlugin extends EditorPlugin {

    public name = "hyperlink";

    public toolbarButton: PluginToolbarButton = {
        component: HyperlinkAction
    };

    public bubbleMenu: PluginBubbleMenu = {
        component: HyperLinkMenu,
        element: undefined
    };

    public getExtensions(editor: Editor): Extensions {
        return [
            this.getLinkExtension(),
            this.getBubbleMenuExtension(editor, this.bubbleMenu.element),
        ]
    }

    private getLinkExtension(): Mark {
        return Link.configure({
            openOnClick: false,
        });
    }

    private getBubbleMenuExtension(editor: Editor, element?: HTMLElement): Extension {
        return BubbleMenu.configure({
            pluginKey: "bubbleMenuHyperlink",
            tippyOptions: {
                placement: "bottom",
                onShow: () => currentFocusLink.set(editor.getAttributes("link").href),
            },
            shouldShow: ({ editor }) =>
                editor.isEditable &&
                (editor.isActive("link") || get(showLinkBubbleMenu)),
            element: element,
        });
    }
}
