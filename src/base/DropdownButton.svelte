<script lang="ts">
  import type { Snippet } from "svelte";
  import { clickOutside } from "../utils/click-outside";
  import SimpleButton from "./SimpleButton.svelte";
  import type Props from "../../types/Props";

  interface DropdownProps extends Props {
    key: string;
    icon: string;
    dropdownOpen?: boolean;
    children: Snippet;
  }

  let { editor, key, icon, dropdownOpen, readonly, children }: DropdownProps = $props();

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }
  //close dropdown when user clicks outside
  function outsideclick() {
    dropdownOpen = false;
  }
</script>

<div class="dropdown-wrapper" use:clickOutside onoutclick={outsideclick}>
  <SimpleButton {key} {editor} action={toggleDropdown} {icon} {readonly} />

  {#if dropdownOpen}
    <div class="dropdown">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .dropdown-wrapper {
    position: relative;

    :global(> button:after) {
      margin-left: 0.25rem;
      content: "";
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-left: 0.3em solid transparent;
      color: var(--icon-text-color);
    }

    .dropdown {
      position: absolute;
      box-shadow: var(--shadow);
      background-color: var(--toolbar-color);
      border-radius: var(--popout-border-radius);
    }
  }
</style>
