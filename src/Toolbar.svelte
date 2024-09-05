<script lang="ts">
    import { toggleBold, toggleItalic, toggleStrike } from "./buttonActions.js";
    import actions from "./actions";
    import Button from "./Button.svelte";

    export let editor;
    export let toolbar;
    export let disabled;
</script>

{#if editor}
    <div class="toolbar">
        <Button
            {editor}
            {disabled}
            key="bold"
            on:click={() => toggleBold(editor)}
        />
        <Button
            {editor}
            {disabled}
            key="italic"
            on:click={() => toggleItalic(editor)}
        />
        <Button
            {editor}
            {disabled}
            key="strike"
            on:click={() => toggleStrike(editor)}
        />
    </div>
{/if}

<style>
    .toolbar {
        background: #ccc;
        padding: 2px;
        min-height: 36px;
    }
</style>
