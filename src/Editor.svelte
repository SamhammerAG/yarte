<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import {
    Editor,
    posToDOMRect,
    type Extension,
    type Mark,
    type Node,
  } from "@tiptap/core";

  import { type Node as ProsemirrorNode } from "prosemirror-model";
  import BubbleMenu from "@tiptap/extension-bubble-menu";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import { onDestroy } from "svelte";
  import Toolbar from "./Toolbar.svelte";
  import ActionDefinitions from "./ActionDefinitions";
  import HyperLinkMenu from "./bubble-menus/HyperLinkMenu.svelte";
  import type { Action } from "../types/Action";
  import type { ActionsContext } from "../types/ActionsContext";
  import { showLinkBubbleMenu, currentFocusLink } from "./stores";
  import TableMenu from "./bubble-menus/TableMenu.svelte";
  import Gapcursor from "@tiptap/extension-gapcursor";

  export let content: string = "";
  export let disabled: boolean = false;
  export let toolbar: string[] = [];
  export let darkmode: boolean = false;
  export let bubbleMenuLinks: HTMLElement;
  export let bubbleMenuTable: HTMLElement;

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
        Gapcursor,
        BubbleMenu.configure({
          pluginKey: "bubbleMenuHyperlink",
          tippyOptions: {
            hideOnClick: true,
            animation: true,
            placement: "bottom",
            onShow: () => {
              $currentFocusLink = editor.getAttributes("link").href;
            },
          },
          shouldShow: ({ editor }) => {
            return editor.isActive("link") || $showLinkBubbleMenu;
          },
          element: bubbleMenuLinks,
        }),
        BubbleMenu.configure({
          pluginKey: "bubbleMenuTable",
          tippyOptions: {
            animation: true,
            placement: "bottom",
            getReferenceClientRect: () => {
              const { state, view } = editor;
              const { from, to } = view.state.selection;
              var tableNode: HTMLElement[] = [];

              state.doc.nodesBetween(from, to, (_node, pos, parent) => {
                if (parent === state.doc) {
                  tableNode.push(view.nodeDOM(pos) as HTMLElement);
                }
              });

              if (tableNode[0]) {
                return tableNode[0].getBoundingClientRect();
              }

              return posToDOMRect(view, from, to);
            },
          },
          shouldShow: ({ editor }) => editor.isActive("table"),
          element: bubbleMenuTable,
        }),
        ...getExtensions({ imageUpload }),
      ],
      content: content,
      onTransaction: () => {
        activeButtons = toolbar.filter((key: string) =>
          editor.isActive(key.toLowerCase()),
        );
      },
    });
  }

  function findLastTableNode(node: ProsemirrorNode): ProsemirrorNode | null {
    let tableNode: ProsemirrorNode | null = null;

    function traverse(currentNode: ProsemirrorNode) {
      if (currentNode.type.name === "table") {
        tableNode = currentNode;
      }

      if (currentNode.content && currentNode.content.childCount > 0) {
        currentNode.content.descendants((child) => {
          traverse(child);
        });
      }
    }

    traverse(node);
    return tableNode;
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
<div bind:this={bubbleMenuLinks}>
  <HyperLinkMenu {editor} />
</div>
<div bind:this={bubbleMenuTable}>
  <TableMenu {editor} />
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
