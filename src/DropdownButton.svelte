<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "./types/Action";
  import type { Subaction } from "./types/SubAction";

  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let action: Action;
  export let complex: boolean = false;

  let active: boolean = false;

  function toggleDropdown() {
    active = !active;
    activeButtons = active
      ? [...activeButtons, action.key]
      : activeButtons.filter((k) => k !== action.key);
  }

  function handleClick(action: Subaction) {
    action.buttonAction(editor);
    toggleDropdown();
  }
</script>

<!-- ############################### <HTML> ############################## -->

<div class="dropdown-button">
  <button {disabled} class:active on:click={() => toggleDropdown()}>
    <img src={action.buttonIcon} alt={action.key} />
  </button>

  {#if active && !complex && action.subactions}
    <div class="dropdown">
      {#each action.subactions as subaction}
        <button {disabled} on:click={() => handleClick(subaction)}>
          <img src={subaction.buttonIcon} alt={subaction.key} />
        </button>
      {/each}
    </div>
  {/if}

  {#if active && complex}
    <slot {toggleDropdown} name="dropdown"></slot>
  {/if}
</div>

<!-- ############################## </HTML> ############################## -->

<style>
  :global(.dropdown-button > button::after) {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.255em;
    vertical-align: 0.255em;
    content: "";
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
  }

  .dropdown-button {
    position: relative;
  }

  .dropdown-button .dropdown {
    position: absolute;
  }
</style>
