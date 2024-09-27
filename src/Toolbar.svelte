<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../types/Action";

  export let editor: Editor;
  export let configuredActions: (Action | "|")[];
  export let disabled: boolean;
  export let activeButtons: string[];
  export let imageUpload: (file: File) => Promise<string>;
</script>

<div class="toolbar">
  {#each configuredActions as action}
    {#if action === "|"}
      <div class="spacer"></div>
    {:else}
      <svelte:component
        this={action.component}
        {editor}
        {disabled}
        {activeButtons}
        key={action.key}
        {imageUpload}
      />
    {/if}
  {/each}
</div>

<style>
  .toolbar {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    box-shadow: var(--shadow);
    background-color: var(--toolbar-color);
    padding: 0.25rem;

    & .spacer {
      width: 1px;
      margin: 0 0.25rem;
      background-color: var(--icon-text-color);
    }

    & > button,
    > .dropdown-wrapper > button {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.25rem;
      border: none;
      border-radius: 0.3rem;
      background-color: var(--button-color);

      &.active {
        background-color: var(--button-active);
      }

      &:hover {
        background-color: var(--button-hover);
      }

      & svg {
        width: 1.25rem;
        height: 1.25rem;
        color: var(--icon-text-color);
      }
    }
  }
</style>
