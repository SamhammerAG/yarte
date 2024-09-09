<script lang="ts">
    import type { Editor } from "@tiptap/core";

    export let editor: Editor;
    export let key: string;
    export let disabled: boolean;
    export let activeButtons: string[] = [];
</script>

<button {disabled} class:active={activeButtons.includes(key)} on:click
    >{key}</button
>

<style>
    button {
        margin: 0;
    }

    button.active {
        background: black;
        color: white;
    }
</style>
