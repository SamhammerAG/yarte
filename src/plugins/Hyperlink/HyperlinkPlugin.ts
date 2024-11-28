import Link from "@tiptap/extension-link";
import { EditorPlugin } from "../EditorPlugin";
import HyperlinkAction from "./HyperlinkAction.svelte";
import HyperLinkMenu from "./HyperLinkMenu.svelte";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import type { Extension, Extensions, Mark } from "@tiptap/core";
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

  public getExtensions(): Extensions {
    return [
      this.getLinkExtension(),
      this.getBubbleMenuExtension(),
    ]
  }

  private getLinkExtension(): Mark {
    return Link.configure({
      openOnClick: false,
    });
  }

  private getBubbleMenuExtension(): Extension {
    return BubbleMenu.configure({
      pluginKey: "bubbleMenuHyperlink",
      tippyOptions: {
        hideOnClick: true,
        placement: "bottom",
        onShow: () => {
          currentFocusLink.set(this.getEditor().getAttributes("link").href);
        }
      },
      shouldShow: ({ editor }) => {
        return editor.isEditable && (editor.isActive("link") || get(showLinkBubbleMenu))
      },

      element: this.bubbleMenu.element,
    });
  }
}
