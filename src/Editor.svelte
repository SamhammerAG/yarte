<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor, type Extension, type Mark, type Node } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import { onDestroy } from "svelte";
  import Toolbar from "./Toolbar.svelte";
  import ActionDefinitions from "./ActionDefinitions";
  import type { Action } from "../types/Action";
  import type { ActionsContext } from "../types/ActionsContext";

  export let content: string = "";
  export let disabled: boolean = false;
  export let toolbar: string[] = [];
  export let darkmode: boolean = false;
  export let imageUpload: (file: File) => Promise<string> = () =>
    new Promise(() => {
      console.log("Test");
      return "test";
    });

  // update Editor if outside params change
  $: content, editor && updateContent();
  $: disabled, editor && updateDisabled();
  $: toolbar, toolbar.length > 0 && initializeEditor();

  let element: HTMLElement;
  let editor: Editor;
  let activeButtons: string[] = [];

  const configuredActions: (Action | "|")[] = [];

  onDestroy(() => {
    editor.destroy();
  });

  function initializeEditor(): void {
    if (editor) resetEditor(editor);

    initializeActions();

    editor = new Editor({
      element: element,
      editable: !disabled,
      extensions: [
        Document,
        Paragraph,
        Text,
        ...getExtensions({ imageUpload }),
      ],
      content: content,
      onTransaction: () => {
        activeButtons = toolbar.filter((key: string) =>
          editor.isActive(key.toLowerCase()),
        );
        console.log("UPDATED");
      },
    });
  }

  function initializeActions(): void {
    var availableActions = ActionDefinitions.getActions();

    toolbar.forEach((key: string) => {
      const action = availableActions.find((a) => a.key === key);

      if (action) {
        configuredActions.push(action);
      } else if (key === "|") {
        configuredActions.push(key);
      } else {
        console.log(`Action '${key}' not found`);
      }
    });
  }

  function getExtensions(
    context: ActionsContext,
  ): Set<Mark<any> | Node<any> | Extension<any>> {
    return new Set(
      configuredActions
        .filter((a) => a !== "|")
        .flatMap((a) => a.extensions(context)),
    );
  }

  function updateContent(): void {
    editor.commands.setContent(content);
  }

  function updateDisabled(): void {
    editor.setEditable(!disabled);
  }

  function resetEditor(editor: Editor): void {
    editor.destroy();
    activeButtons.length = 0;
    configuredActions.length = 0;
  }
</script>

<!-- ############################## <HTML> ############################## -->

<div id="yarte-editor" class:darkmode>
  {#if configuredActions.length > 0 && editor}
    <Toolbar
      {editor}
      {disabled}
      {configuredActions}
      {activeButtons}
      {imageUpload}
    />
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
