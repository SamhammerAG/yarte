<script lang="ts">
    export let editor;
    export let key;
    export let disabled;
</script>

<button {disabled} class:active={editor.isActive(key)} on:click>{key}</button>

<style>
    button {
        margin: 0;
    }

    button.active {
        background: black;
        color: white;
    }
</style>
