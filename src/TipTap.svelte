<svelte:options customElement="yarte-editor" />

<script lang="ts">
    import { Editor, Extension, Mark } from "@tiptap/core";
    import Document from "@tiptap/extension-document";
    import Paragraph from "@tiptap/extension-paragraph";
    import Text from "@tiptap/extension-text";
    import Strike from "@tiptap/extension-strike";
    import Bold, { type BoldOptions } from "@tiptap/extension-bold";
    import Italic from "@tiptap/extension-italic";

    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import Toolbar from "./Toolbar.svelte";

    export let content = "";
    export let disabled = true;
    export let toolbar = [""];
    export let imageUpload = () => {
        console.log("Image Upload not defined!");
    };

    const possibleActions = [
        { key: "bold", action: Bold },
        { key: "italic", action: Italic },
        { key: "strike", action: Strike },
    ];

    $: toolbar, initliazieEditor();

    const contentStore = writable(content);

    let element: HTMLElement;
    let editor: Editor;

    onDestroy(() => {
        editor.destroy();
    });

    function initliazieEditor(): void {
        editor = new Editor({
            element,
            extensions: [Document, Text, Paragraph, ...getExtensions()],
            content,
            onTransaction: () => {
                editor = editor;
            },
        });

        editor.on("update", ({ editor }) => {
            contentStore.set(editor.getHTML());
        });
    }

    function getExtensions(): Mark<any>[] {
        const extensions: Mark<BoldOptions, any>[] = [];

        toolbar.forEach((item: string) => {
            const action = possibleActions.find((a) => a.key === item);

            if (action) {
                extensions.push(action.action);
            }
        });

        return extensions;
    }
</script>

<div id="yarte-editor">
    <Toolbar {editor} {disabled} {toolbar} />
    <div class="describtion" bind:this={element} />
</div>

{#if editor}
    <pre class="json-output">{JSON.stringify(editor.getJSON(), null, 2)}</pre>
    <div class="html-output">{editor.getHTML()}</div>
    <div class="store-output">{$contentStore}</div>
{/if}

<style>
    .wrapper {
        border: 1px solid #ccc;
        max-height: 200px;
        display: inline-flex;
        flex-direction: column;
    }

    .wrapper:focus-within {
        border: 1px solid red;
    }

    .element-wrapper {
        padding: 1rem;
        flex: 1 1 0%;
        resize: both;
        overflow: auto;
    }

    .element-wrapper :global(p:first-of-type) {
        margin-top: 0;
    }

    .element-wrapper :global(p:last-of-type) {
        margin-bottom: 0;
    }

    .element-wrapper > :global(.ProseMirror) {
        outline: 0;
    }

    .json-output,
    .html-output {
        max-height: 200px;
        overflow: hidden;
        overflow-y: auto;
        border: 1px solid #ccc;
    }
</style>
