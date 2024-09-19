<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import BaseDropdownButton from "./BaseDropdownButton.svelte";
    import type { Action } from "../../types/Action";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let action: Action;

    const colors: string[] = [
        "#E91313",
        "#118800",
        "#63F963",
        "#72CDFD",
        "#fc7999",
        "#FDFD77",
    ];

    function clear() {
        if (action.buttonAction2) {
            action.buttonAction2(editor);
        }
    }
</script>

<BaseDropdownButton {disabled} {activeButtons} {action}>
    <div slot="dropdown" class="dropdown">
        <button class="clear" on:click={clear}>Clear</button>
        {#each colors as color}
            <button
                style="background-color: {color};"
                on:click={() => action.buttonAction(editor, color)}
            ></button>
        {/each}
    </div>
</BaseDropdownButton>

<!-- TODO -->
<style>
    .dropdown {
        position: absolute;
        display: flex;
        flex-flow: row wrap;
        gap: var(--gap);
        width: 7.5rem;
        background-color: white;
        padding: var(--gap);
    }

    .clear {
        width: 100%;
        text-align: center;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid black;
    }

    .dropdown button:not(:first-child) {
        display: flex;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.5rem;
    }
</style>
