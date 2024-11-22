import TextAlign from "@tiptap/extension-text-align";
import { EditorPlugin } from "../EditorPlugin";
import TextAlignAction from "./TextAlignAction.svelte";
import type { PluginToolbarButton } from "../../../types/PluginTypes";
import type { Extension, Extensions } from "@tiptap/core";

export class TextAlignPlugin extends EditorPlugin {

    public name = "textAlignment";
    public toolbarButton: PluginToolbarButton = {
        component: TextAlignAction,
    };

    public getExtensions(): Extensions {
        return [this.getTextAlignExtension()];
    }

    private getTextAlignExtension(): Extension {
        return TextAlign.configure({
            types: ["heading", "paragraph"]
        });
    }
}