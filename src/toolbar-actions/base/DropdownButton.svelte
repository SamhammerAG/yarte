<script lang="ts">
  import type { Snippet } from "svelte";
  import { clickOutside } from "../../utils/click-outside";

  interface Props {
    disabled: boolean;
    activeButtons: string[];
    key: string;
    icon: string;
    callback?: Function;
    active?: boolean;
    children: Snippet;
  }

  let {
    disabled,
    activeButtons,
    key,
    icon,
    callback = () => {},
    active = $bindable(false),
    children,
  }: Props = $props();

  function toggleDropdown() {
    active = !active;
    callback();
  }
  //close dropdown when user clicks outside
  function outsideclick() {
    active = false;
  }
</script>

<div class="dropdown-wrapper" use:clickOutside onoutclick={outsideclick}>
  <button
    {disabled}
    class:active={activeButtons.includes(key) || active}
    onclick={toggleDropdown}
  >
    {@html icon}
  </button>

  {#if active}
    <div class="dropdown">
      {@render children()}
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
      border-radius: var(--popout-border-radius);
    }
  }
</style>
