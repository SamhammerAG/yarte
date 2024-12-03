import type { Extensions } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";
import { EditorPlugin } from "../EditorPlugin";
import { KnowledgeMark } from "./KnowledgeMarkExtension";
import KnowledgeMarkAction from "./KnowledgeMarkAction.svelte";

export class KnowledgeMarkPlugin extends EditorPlugin {
  public name: string = "knowledgeMark";

  public toolbarButton: PluginToolbarButton = {
    component: KnowledgeMarkAction
  };

  public getExtensions(): Extensions {
    return [KnowledgeMark];
  }
}
