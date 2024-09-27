<script lang="ts">
  export let disabled: boolean;
  export let activeButtons: string[];
  export let key: string;
  export let icon: string;
  export let callback: Function = () => {};

  let active: boolean = false;

  function toggleDropdown() {
    active = !active;
    callback();
  }

  //close dropdown when user clicks outside
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

<div class="dropdown-wrapper" on:focusout={handleFocusOut}>
  <button
    {disabled}
    class:active={activeButtons.includes(key) || active}
    on:click={toggleDropdown}
  >
    {@html icon}
  </button>

  {#if active}
    <div class="dropdown">
      <slot></slot>
    </div>
  {/if}
</div>

<style>
  .dropdown-wrapper {
    position: relative;

    & > button:after {
      margin-left: 0.25rem;
      content: "";
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-left: 0.3em solid transparent;
      color: var(--icon-text-color);
    }

    & .dropdown {
      position: absolute;
      box-shadow: var(--shadow);
      background-color: var(--toolbar-color);
    }
  }
</style>
