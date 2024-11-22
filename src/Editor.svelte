<!-- svelte-ignore non_reactive_update -->
<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor, type Extensions } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import { onDestroy, untrack } from "svelte";
  import Gapcursor from "@tiptap/extension-gapcursor";
  import type { EditorPlugin } from "./plugins/EditorPlugin";

  interface Props {
    initCallback: (editor: Editor) => EditorPlugin[];
    content: string;
    readOnly: boolean;
    darkmode: boolean;
  }

  let {
    initCallback = () => [],
    content = "",
    readOnly = false,
    darkmode = false,
  }: Props = $props();

  //update editor if props change
  $effect(() => {
    if (content) editor && updateContent();
  });
  $effect(() => {
    if (readOnly) editor && updateReadOnly();
  });

  $effect(() => {
    if (initCallback) {
      untrack(() => {
        plugins = initCallback(editor);

        if (plugins.length > 0) {
          setTimeout(() => {
            initializeEditor();
          }, 0);
        }
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
        activeButtons = plugins
          .map((p) => p.name)
          .filter((key: string) => editor.isActive(key.toLowerCase()));
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
    return plugins.flatMap((plugin) => {
      return plugin.getExtensions(editor);
    });
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

<!-- ############################## </HTML> ############################## -->

<style>
  #yarte-editor {
    --shadow: rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;

    --box-shadow: 0 1rem 1rem -0.625rem rgba(34, 47, 62, 0.15),
      0 0 2.5rem 1px rgba(34, 47, 62, 0.15);
    --toolbar-color: white;
    --editor: white;
    --icon-text-color: black;

    --popout-border-radius: 8px;
    --button-border-radius: 4px;

    --table-size-selector: #d4d4fc;
    --button-color: white;
    --button-active: #a6ccf7;
    --button-hover: #e2e2e2;

    &.darkmode {
      --shadow: rgba(255, 255, 255, 0.05) 0px 6px 10px 0px,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px;

      --popout-border-radius: 8px;
      --button-border-radius: 4px;

      --toolbar-color: black;
      --editor: rgb(71, 71, 71);
      --icon-text-color: white;

      --button-color: rgb(37, 37, 37);
      --button-active: rgb(109, 4, 109);
      --button-hover: rgb(139, 6, 139);
    }
  }

  #yarte-editor {
    height: 500px;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    box-shadow: var(--box-shadow);
    background-color: var(--editor);
    color: var(--icon-text-color);
    border-radius: var(--popout-border-radius);

    :global(.readOnly) {
      opacity: 0.6;
    }
  }

  .overflow-fix::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  .overflow-fix::-webkit-scrollbar-thumb {
    background: #b0b5ba;
    border-radius: 0.5rem;
  }
  .overflow-fix::-webkit-scrollbar-track {
    background: #efefef;
  }
  .overflow-fix::-webkit-scrollbar-thumb:hover {
    background: #a6ccf7;
  }
  .overflow-fix {
    padding: 1rem 1.5rem 5rem 1.5rem;
    position: relative;
    overflow: auto;
  }

  :global(svg) {
    width: 1.125rem;
    height: 1.125rem;
    color: var(--icon-text-color);
  }

  :global(.tiptap) {
    outline: none;
    overflow: auto;
    word-wrap: break-word;
    white-space: break-spaces;
    transition: opacity 0.15s;
    /** Discuss if we want to keep this */

    :global(table) {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      :global(td),
      :global(th) {
        border: 1px solid var(--icon-text-color);
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }
      :global(th) {
        background-color: rgba(61, 37, 20, 0.05);
        font-weight: bold;
        text-align: left;
      }

      :global(.selectedCell:after) {
        background: rgba(61, 37, 20, 0.08);
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      :global(.column-resize-handle) {
        background-color: #6a00f5;
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }

    :global(.tableWrapper) {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;

      /***/
    }
  }
  .toolbar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin: 0;
    font-family: "Inter", sans-serif;
    box-shadow: var(--shadow);
    background-color: var(--toolbar-color);
    padding: 0 11px 0 12px;
    z-index: 90;

    :global(.spacer) {
      width: 1px;
      margin: 0.25rem 0.25rem;
      background-color: var(--icon-text-color);
    }

    :global(> button),
    :global(> .dropdown-wrapper > button) {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 6px 1px 5px 0;
      height: 28px;
      border: none;
      border-radius: var(--button-border-radius);
      background-color: var(--button-color);

      &.active {
        background-color: var(--button-active);
      }

      &:hover {
        background-color: var(--button-hover);
      }

      :global(svg) {
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--icon-text-color);
      }
    }
  }
</style>
