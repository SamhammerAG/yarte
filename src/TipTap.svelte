<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor, Mark, Node } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import { onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import Toolbar from "./Toolbar.svelte";
  import Extensions from "./Extensions";

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
  $: toolbar, initializeEditor();

  onDestroy(() => {
    editor.destroy();
  });

  function initializeEditor(): void {
    editor = new Editor({
      element: element,
      editable: !disabled,
      extensions: [Document, Paragraph, Text, ...getConfiguredExtensions()],
      content: content,
      onUpdate: () => {
        contentStore.set(editor.getHTML());
      },
      onSelectionUpdate: () => {
        //update active buttons when cursor position changes
        activeButtons = toolbar.filter((key: string) =>
          editor.isActive(key.toLowerCase()),
        );
      },
    });
  }

  function getConfiguredExtensions(): Array<Node<any> | Mark<any>> {
    return Object.entries(Extensions)
      .filter(([key, _extension]) => toolbar.includes(key.toLowerCase()))
      .map(([_key, extension]) => extension);
  }

  function updateContent(): void {
    editor.commands.setContent(content);
    contentStore.set(editor.getHTML());
  }

  function updateDisabled(): void {
    editor.setEditable(!disabled);
  }
</script>

<div id="yarte-editor">
  {#if toolbar.length > 0}
    <Toolbar {editor} {disabled} {toolbar} {activeButtons} />
  {/if}
  <div class="description" bind:this={element} />
</div>

<div class="store-output">{$contentStore}</div>

<style>
  :global(.tiptap) {
    min-height: 300px;
    word-wrap: break-word;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 3rem;
  }
</style>
