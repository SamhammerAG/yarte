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

    public getExtensions(fn: (callback: (editor?: Editor) => void) => void, editor?: Editor): Extensions {
        return [
            this.getLinkExtension(),
            this.getBubbleMenuExtension(fn, this.bubbleMenu.element, editor),
        ]
    }

    private getLinkExtension(): Mark {
        return Link.configure({
            openOnClick: false,
        });
    }

    private getBubbleMenuExtension(fn: (callback: (editor?: Editor) => void) => void, element?: HTMLElement, editor?: Editor): Extension {
        return BubbleMenu.configure({
            pluginKey: "bubbleMenuHyperlink",
            tippyOptions: {
                placement: "bottom",
                onShow: () => {
                    /*fn((editor?: Editor) => {
                        currentFocusLink.set(editor?.getAttributes("link").href)
                    })
                        */
                    currentFocusLink.set(editor?.getAttributes("link").href)
                },
            },
            shouldShow: ({ editor }) => {
                return editor.isEditable && (editor.isActive("link") || get(showLinkBubbleMenu))
            },

            element: element,
        });
    }
}
