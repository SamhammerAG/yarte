<script lang="ts">
    import type { Editor } from "@tiptap/core";

    export let editor: Editor;
    export let key: string;
    export let disabled: boolean;
    export let activeButtons: string[] = [];
    export let action: Function;
</script>

<button
    {disabled}
    class:active={activeButtons.includes(key.toLowerCase())}
    on:click={() => action(editor)}>{key}</button
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
