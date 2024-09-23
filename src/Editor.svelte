<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor, type Extension, type Mark, type Node } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import Toolbar from "./Toolbar.svelte";
  import ActionDefinitions from "./ActionDefinitions";

  export let content: string = "";
  export let disabled: boolean = false;
  export let toolbar: string[] = [];
  export let darkmode: boolean = false;
  export let imageUpload: (file: File) => Promise<string>;

  let element: HTMLElement;
  let editor: Editor;
  let activeButtons: string[] = [];
  const contentStore = writable(content);

  // execute everything after comma when before comma changes
  $: content, editor && updateContent();
  $: disabled, editor && updateDisabled();
  $: toolbar, toolbar.length > 0 && initializeEditor();

  onDestroy(() => {
    editor.destroy();
  });

  function initializeEditor(): void {
    if (editor) {
      editor.destroy();
      activeButtons.length = 0;
      contentStore.set("");
    }

    editor = new Editor({
      element: element,
      editable: !disabled,
      extensions: [Document, Paragraph, Text, ...getExtensions()],
      content: content,
      onUpdate: () => {
        contentStore.set(editor.getHTML());
      },
      onSelectionUpdate: () => {
        //update active buttons when cursor position changes
        activeButtons = toolbar.filter((key: string) =>
          editor.isActive(key.toLowerCase()),
        );
        console.log(activeButtons);
      },
    });

    contentStore.set(editor.getHTML());
  }

  function getExtensions(): Set<Node<any> | Mark<any> | Extension<any>> {
    return new Set(
      ActionDefinitions.getActions({ imageUpload })
        .filter((action) => toolbar.includes(action.key))
        .flatMap((action) => [
          ...action.extensions,
          ...(action.subactions?.flatMap((subaction) => subaction.extensions) ??
            []),
        ]),
    );
  }

  function updateContent(): void {
    editor.commands.setContent(content);
    contentStore.set(editor.getHTML());
  }

  function updateDisabled(): void {
    editor.setEditable(!disabled);
  }
</script>

<!-- ############################## <HTML> ############################## -->

<div id="yarte-editor" class:darkmode>
  {#if toolbar.length > 0 && editor}
    <Toolbar {editor} {disabled} {toolbar} {activeButtons} {imageUpload} />
  {/if}
  <div class="description" bind:this={element} />
</div>

<!-- ############################## </HTML> ############################## -->

<style>
  #yarte-editor {
    --shadow: rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;

    --toolbar-color: white;
    --editor: white;
    --icon-text-color: black;

    --button-color: lightgray;
    --button-active: lightgreen;
    --button-hover: rgb(56, 221, 56);
  }

  #yarte-editor.darkmode {
    --shadow: rgba(255, 255, 255, 0.05) 0px 6px 10px 0px,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px;

    --toolbar-color: black;
    --editor: rgb(71, 71, 71);
    --icon-text-color: white;

    --button-color: rgb(37, 37, 37);
    --button-active: rgb(109, 4, 109);
    --button-hover: rgb(139, 6, 139);
  }

  #yarte-editor {
    width: 800px;
  }

  :global(.tiptap) {
    height: 300px;
    border: 1px solid black;
    padding: 0 1rem;
    outline: none;

    /** Discuss if we want to keep this */
    background-color: var(--editor);
    color: var(--icon-text-color);

    & table,
    td {
      border-collapse: collapse;
      border: 1px solid var(--icon-text-color);
    }
    /***/
  }
</style>
