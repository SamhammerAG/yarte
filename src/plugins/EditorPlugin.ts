import type { Editor, Extensions } from "@tiptap/core";
import type { PluginBubbleMenu, PluginToolbarButton } from "../../types/PluginTypes";

export abstract class EditorPlugin {

    public bubbleMenu?: PluginBubbleMenu;

    public abstract name: string;
    public abstract toolbarButton: PluginToolbarButton;
    public abstract getExtensions(editor?: Editor): Extensions;
}