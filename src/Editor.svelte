<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor, type Extensions } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import Gapcursor from "@tiptap/extension-gapcursor";

  import { onDestroy, untrack } from "svelte";
  import type { EditorPlugin } from "./plugins/EditorPlugin";

  interface Props {
    initCallback: () => EditorPlugin[];
    content: string;
    readOnly: boolean;
    darkmode: boolean;
  }

  let { content = "", readOnly = false, darkmode = false, initCallback = () => [] }: Props = $props();

  //update editor if props change
  $effect(() => {
    if (content && editor) updateContent();
  });
  $effect(() => {
    if (readOnly && editor) updateReadOnly();
  });
  $effect(() => {
    if (initCallback().length > 0) {
      untrack(() => {
        init().then(() => {
          initializeEditor();
        });
      });
    }
  });

  let description: HTMLElement;
  let plugins: Array<EditorPlugin> = $state([]);
  let activeButtons: string[] = $state([]);
  let editor: Editor = $state(
    new Editor({
      element: undefined,
      extensions: [Document, Text, Paragraph],
    }),
  );

  onDestroy(() => {
    editor.destroy();
  });

  async function init(): Promise<void> {
    plugins = initCallback();
    plugins.forEach((plugin) => (plugin.getEditor = () => editor));
  }

  function initializeEditor(): void {
    editor = new Editor({
      element: description,
      editable: !readOnly,
      extensions: [Document, Paragraph, Text, Gapcursor, ...getExtensions()],
      content: content,
      onUpdate: () => {
        contentChanged();
      },
      onTransaction: () => {
        activeButtons = plugins.map((p) => p.name).filter((key: string) => editor.isActive(key.toLowerCase()));
      },
    });
  }

  function contentChanged(): void {
    $host().dispatchEvent(
      new CustomEvent("contentChange", {
        detail: {
          html: editor.getHTML(),
          json: editor.getJSON(),
        },
      }),
    );
  }

  function getExtensions(): Extensions {
    return [...new Set(plugins.flatMap((plugin) => plugin.getExtensions()))];
  }

  function updateContent(): void {
    editor.commands.setContent(content);
  }

  function updateReadOnly(): void {
    editor.setEditable(!readOnly);
  }
</script>

<!-- ############################## <HTML> ############################## -->

<div id="yarte-editor" class:darkmode>
  <div class="toolbar">
    {#each plugins as plugin}
      <plugin.toolbarButton.component
        {editor}
        {readOnly}
        {activeButtons}
        key={plugin.name}
        properties={plugin.toolbarButton.properties}
      />
    {/each}
  </div>
  <div class="overflow-fix">
    <div class="description" bind:this={description}></div>
    {#each plugins as plugin}
      {#if plugin.bubbleMenu?.component}
        <div bind:this={plugin.bubbleMenu.element}>
          <plugin.bubbleMenu.component {editor} />
        </div>
      {/if}
    {/each}
  </div>
</div>
