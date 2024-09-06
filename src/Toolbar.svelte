<script lang="ts">
  import Actions from "./Actions";
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
      on:click={() => Actions.bold(editor)}
    />
    <Button
      {editor}
      {disabled}
      key="italic"
      on:click={() => Actions.italic(editor)}
    />
    <Button
      {editor}
      {disabled}
      key="strike"
      on:click={() => Actions.strike(editor)}
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
