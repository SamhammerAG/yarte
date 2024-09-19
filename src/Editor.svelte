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

<div id="yarte-editor">
  {#if toolbar.length > 0 && editor}
    <Toolbar {editor} {disabled} {toolbar} {activeButtons} {imageUpload} />
  {/if}
  <div class="description" bind:this={element} />
</div>

<div class="store-output">{$contentStore}</div>

<!-- ############################## </HTML> ############################## -->

<style>
  * {
    --shadow: rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
    --color: #166e67;
    --gap: 0.5rem;
    --radius: 5px;
    --darkgray: rgba(61, 37, 20, 0.12);
    --lightgray: rgba(61, 37, 20, 0.05);
    --silver: rgba(61, 37, 20, 0.08);
    --purple: #6a00f5;
    --selected: #a6ccf7;
    --hover: #f0f0f0;
    --border: #ccced1;
    --spacer: #ccced1;
  }

  #yarte-editor {
    width: 50%;
    min-width: 1000px;
    margin: 0 auto;
  }

  :global(.tiptap) {
    min-height: 300px;
    word-wrap: break-word;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 3rem;
  }
  :global(.toolbar) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 10px;
    margin: 0;
    padding: 7px;
    font-family: "Inter", sans-serif;
    box-shadow: var(--shadow);
  }

  :global(.spacer) {
    min-width: 1px;
    width: 1px;
    background: var(--spacer);
  }

  :global(button) {
    display: flex;
    background-color: white;
    padding: 3px 6px 3px 6px;
    align-items: center;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    position: relative;
  }

  :global(.active:not([disabled])) {
    background: var(--selected);
    border: 0;
    box-shadow: none;
    color: #222f3e;
    position: relative;
  }

  :global(button img) {
    width: 22px;
    height: 22px;
  }

  :global(button:hover),
  :global(button:focus) {
    background-color: var(--hover);
  }

  :global(.dropdown-button > button::after) {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }

  :global(.dropdown-button) {
    position: relative;
  }

  :global(.dropdown-button .dropdown) {
    position: absolute;
    box-shadow: var(--shadow);
    background-color: white;
  }

  :global(table) {
    border-collapse: collapse;
    border: 1px solid #ff0000;
  }

  :global(table td) {
    border: 1px solid #ff0000;
  }
</style>
