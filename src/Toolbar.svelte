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
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin: 0;
    font-family: "Inter", sans-serif;
    box-shadow: var(--shadow);
    background-color: var(--toolbar-color);
    padding: 0 11px 0 12px;
    z-index: 90;

    & .spacer {
      width: 1px;
      margin: 0.25rem 0.25rem;
      background-color: var(--icon-text-color);
    }

    & > button,
    & > .dropdown-wrapper > button {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 6px 1px 5px 0;
      height: 28px;
      border: none;
      border-radius: var(--button-border-radius);
      background-color: var(--button-color);

      &.active {
        background-color: var(--button-active);
      }

      &:hover {
        background-color: var(--button-hover);
      }

      & svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: var(--icon-text-color);
      }
    }
  }
</style>
