<script lang="ts">
  import type { Action } from "../../types/Action";

  export let disabled: boolean;
  export let activeButtons: string[];
  export let action: Action;

  let active: boolean = false;

  function toggleDropdown() {
    active = !active;
    activeButtons = active
      ? [...activeButtons, action.key]
      : activeButtons.filter((k) => k !== action.key);
  }

  function handleFocusOut({ relatedTarget, currentTarget }: FocusEvent) {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    active = false;
  }
</script>

<div class="dropdown-button" on:focusout={handleFocusOut}>
  <button {disabled} class:active on:click={toggleDropdown}>
    <img src={action.buttonIcon} alt={action.key} />
  </button>

  {#if active}
    <slot name="dropdown"></slot>
  {/if}
</div>
