<script lang="ts">
  import type { Snippet } from "svelte";
  import { clickOutside } from "../utils/click-outside";
  import SimpleButton from "./SimpleButton.svelte";
  import type { Editor } from "@tiptap/core";
  import { fly } from "svelte/transition";

  interface Props {
    editor: Editor;
    key: string;
    icon: string;
    dropdownOpen?: boolean;
    children: Snippet;
    tooltip: string;
  }

  let { editor, key, icon, dropdownOpen = $bindable(), children, tooltip }: Props = $props();

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }
  //close dropdown when user clicks outside
  function outsideclick() {
    dropdownOpen = false;
  }
</script>

<div class="dropdown-wrapper" use:clickOutside onoutclick={outsideclick}>
  <SimpleButton {key} {editor} action={toggleDropdown} {icon} {tooltip} />

  {#if dropdownOpen}
    <div transition:fly class="dropdown">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .dropdown-wrapper {
    position: relative;

    :global(> .button-wrapper > button:after) {
      margin-left: 0.25rem;
      content: "";
      border-top: 0.3em solid;
      border-right: 0.3em solid transparent;
      border-left: 0.3em solid transparent;
      color: black;
    }

    .dropdown {
      z-index: 99;
      position: absolute;
      box-shadow:
        rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
        rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
      background-color: white;
      border-radius: 8px;
    }
  }
</style>
