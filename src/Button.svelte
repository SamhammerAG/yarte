<script lang="ts">
    import type { Editor } from "@tiptap/core";

    export let editor: Editor;
    export let key: string;
    export let disabled: boolean;
    export let activeButtons: string[] = [];
    export let action: Function;

    function handleClick() {
        if (activeButtons.includes(key.toLowerCase())) {
            activeButtons = activeButtons.filter(
                (button: string) => button !== key.toLowerCase(),
            );
            console.log(activeButtons);
        } else {
            activeButtons = [...activeButtons, key.toLowerCase()];
            console.log(activeButtons);
        }

        action(editor);
    }
</script>

<button
    {disabled}
    class:active={activeButtons.includes(key.toLowerCase())}
    on:click={() => handleClick()}>{key}</button
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
