<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import BaseDropdownButton from "./BaseDropdownButton.svelte";
    import type { Action } from "../../types/Action";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let action: Action;

    let hyperlink: string = "";

    function setHyperlink() {
        if (action.buttonAction) {
            action.buttonAction(editor, hyperlink);
            hyperlink = "";
        }
    }
</script>

<BaseDropdownButton {disabled} {activeButtons} {action}>
    <div slot="dropdown" class="dropdown">
        <input
            type="text"
            placeholder="https://example.com"
            bind:value={hyperlink}
        />
        <button on:click={setHyperlink}>
            <img src="./icons/check-line.svg" alt={action.key} />
        </button>
        <button on:click={() => editor.chain().focus()}
            ><img src="./icons/close-line.svg" alt={action.key} /></button
        >
    </div>
</BaseDropdownButton>

<style>
    .dropdown {
        display: flex;
        flex-flow: row wrap;
        padding: 0.5rem;
    }

    button,
    input {
        display: flex;
    }
</style>
