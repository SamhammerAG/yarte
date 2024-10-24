<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor, type Extensions } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Focus from "@tiptap/extension-focus";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import Toolbar from "./Toolbar.svelte";
  import type { Action } from "../types/Action";
  import Gapcursor from "@tiptap/extension-gapcursor";

  export let content: string = "";
  export let readOnly: boolean = false;
  export let toolbar: string[] = [];
  export let darkmode: boolean = false;
  export let imageUpload: (file: File) => Promise<string> = () =>
    new Promise(() => {
      console.log("Test");
      return "test";
    });

  const dispatch = createEventDispatcher();
  let description: HTMLElement;
  let editor: Editor;
  let activeButtons: string[] = [];

  // update Editor if outside params change
  $: content, editor && updateContent();
  $: readOnly, editor && updateDisabled();
  $: toolbar, toolbar.length > 0 && initializeEditor();

  let configuredActions: (Action | "|")[] = [];

  onDestroy(() => {
    editor.destroy();
  });

  onMount(() => {
    initializeEditor();
  });

  function initializeEditor(): void {
    if (editor) resetEditor(editor);

    editor = new Editor({
      element: description,
      editable: !readOnly,
      autofocus: true,
      extensions: [
        Document,
        Paragraph,
        Text,
        Gapcursor,
        Focus.configure({
          mode: "shallowest",
        }),
        ...getExtensions(),
      ],
      content: content,
      onUpdate: () => {
        contentChanged();
      },
      onTransaction: () => {
        activeButtons = toolbar.filter((key: string) =>
          editor.isActive(key.toLowerCase()),
        );
      },
    });
  }

  function contentChanged(): void {
    dispatch("contentChange", {
      html: editor.getHTML(),
      json: editor.getJSON(),
    });
  }

  function getExtensions(): Extensions {
    return []; //TODO
  }

  function updateContent(): void {
    editor.commands.setContent(content);
  }

  function updateDisabled(): void {
    editor.setEditable(!readOnly);
  }

  function resetEditor(editor: Editor): void {
    editor.destroy();
    activeButtons.length = 0;
    configuredActions.length = 0;
  }
</script>

<!-- ############################## <HTML> ############################## -->

<div id="yarte-editor" class:darkmode>
  {#if configuredActions.length > 0}
    <Toolbar
      {editor}
      disabled={readOnly}
      {configuredActions}
      {activeButtons}
      {imageUpload}
    />
  {/if}
  <div class="description" bind:this={description} />
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
  }

  #yarte-editor.darkmode {
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

  #yarte-editor {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: hidden;
    box-shadow: var(--box-shadow);
    background-color: var(--editor);
    color: var(--icon-text-color);
    border-radius: var(--popout-border-radius);

    &.readonly {
      opacity: 0.6;
    }
  }

  :global(.has-focus) {
    outline: 3px solid #b4d7ff;
    border-radius: 3px;
  }

  :global(.tiptap) {
    min-height: 300px;
    word-wrap: break-word;
    white-space: break-spaces;
    overflow: hidden;
    position: relative;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    transition: opacity 0.15s;
    outline: 2px solid #006ce7;

    /** Discuss if we want to keep this */

    & table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      & td,
      & th {
        border: 1px solid var(--icon-text-color);
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;

        & > * {
          margin-bottom: 0;
        }
      }
      & th {
        background-color: rgba(61, 37, 20, 0.05);
        font-weight: bold;
        text-align: left;
      }

      & .selectedCell:after {
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

      & .column-resize-handle {
        background-color: #6a00f5;
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }

    & .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;

      /***/
    }
  }
</style>
