<svelte:options customElement="yarte-editor" />

<script lang="ts">
  import { Editor } from "@tiptap/core";
  import Document from "@tiptap/extension-document";
  import Paragraph from "@tiptap/extension-paragraph";
  import Text from "@tiptap/extension-text";
  import Strike from "@tiptap/extension-strike";
  import Bold from "@tiptap/extension-bold";
  import Italic from "@tiptap/extension-italic";

  import Image from "@tiptap/extension-image";
  import { Plugin } from "@tiptap/pm/state";

  import { onDestroy, onMount } from "svelte";
  import { writable } from "svelte/store";
  import Toolbar from "./Toolbar.svelte";
  import BulletList from "@tiptap/extension-bullet-list";
  import Color from "@tiptap/extension-color";
  import Link from "@tiptap/extension-link";
  import ListItem from "@tiptap/extension-list-item";
  import OrderedList from "@tiptap/extension-ordered-list";
  import Table from "@tiptap/extension-table";
  import TableCell from "@tiptap/extension-table-cell";
  import TableHeader from "@tiptap/extension-table-header";
  import TableRow from "@tiptap/extension-table-row";
  import TextAlign from "@tiptap/extension-text-align";
  import TextStyle from "@tiptap/extension-text-style";
  import Underline from "@tiptap/extension-underline";
  import Highlight from "@tiptap/extension-highlight";
  import History from "@tiptap/extension-history";

  export let content: string = "";
  export let disabled: boolean = false;
  export let toolbar: string[] = [];
  export let imageUpload: (file: File) => Promise<string>;
  export let activeButtons: string[] = [];

  const contentStore = writable(content);

  let element: HTMLElement;
  let editor: Editor;

  // execute everything after comma when before comma changes
  $: content, editor && updateEditorContent();
  $: disabled, editor && updateDisabled();

  onMount(() => {
    initliazieEditor();
  });

  onDestroy(() => {
    editor.destroy();
  });

  function initliazieEditor(): void {
    editor = new Editor({
      element: element,
      editable: !disabled,
      extensions: [
        Document,
        Text,
        TextStyle,
        Bold,
        Italic,
        Link,
        Strike,
        History,
        Image.configure({
          inline: true,
        }).extend({
          addProseMirrorPlugins: () => {
            return [
              new Plugin({
                props: {
                  handlePaste: (view, event) => {
                    const hasFiles =
                      event.clipboardData &&
                      event.clipboardData.files &&
                      event.clipboardData.files.length;

                    if (!hasFiles) {
                      return;
                    }

                    const images = Array.from(event.clipboardData.files).filter(
                      (file) => {
                        return file.type.includes("image/");
                      },
                    );

                    if (images.length === 0) {
                      return;
                    }

                    event.preventDefault();

                    const { schema } = view.state;

                    for (const image of images) {
                      imageUpload(image).then((img: string) => {
                        const node = schema.nodes.image.create({
                          src: img,
                        });
                        const transaction =
                          view.state.tr.replaceSelectionWith(node);
                        view.dispatch(transaction);
                      });
                    }
                  },
                },
              }),
            ];
          },
        }),
        Underline,
        Paragraph,
        Highlight.configure({
          multicolor: true,
        }),
        BulletList,
        OrderedList,
        Table.configure({
          resizable: true,
        }),
        Color,
        TableCell,
        TableRow,
        TableHeader,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        ListItem,
      ],
      content: content,
      onUpdate: () => {
        contentStore.set(editor.getHTML());
        console.log("updated");
      },
      onSelectionUpdate: () => {
        //update active buttons when cursor position changes
        activeButtons = toolbar.filter((key: string) =>
          editor.isActive(key.toLowerCase()),
        );
      },
    });
  }

  function updateEditorContent(): void {
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

{#if editor}
  <div class="store-output">{$contentStore}</div>
{/if}

<style>
  :global(.tiptap) {
    min-height: 300px;
    word-wrap: break-word;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 3rem;
  }
</style>
