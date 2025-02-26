<svelte:options customElement="font-color-button" />

<script lang="ts">
  import FontColorIcon from "../../../icons/font-color.svg?raw";
  import EraserIcon from "../../../icons/eraser-line.svg?raw";
  import DropdownButton from "../../base/DropdownButton.svelte";
  import Icon from "../../base/Icon.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor }: { editor: Editor } = $props();
  let dropdownOpen = $state(false);
  const colors: string[] = ["#E91313", "#118800", "#63F963", "#72CDFD", "#fc7999", "#FDFD77"];

  function clearColor() {
    editor.chain().focus().unsetColor().run();
    dropdownOpen = false;
  }

  function setColor(color: string) {
    editor.chain().focus().setColor(color).run();
    dropdownOpen = false;
  }
</script>

{#if editor}
  <DropdownButton {editor} {dropdownOpen} key="textStyle" icon={FontColorIcon}>
    <div class="color-picker">
      <button class="clear" onclick={clearColor}>
        <Icon content={EraserIcon} />
      </button>

      {#each colors as color}
        <button style="background-color: {color};" onclick={() => setColor(color)} aria-label={color}></button>
      {/each}
    </div>
  </DropdownButton>
{/if}

<style>
  .color-picker {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    width: 6.75rem;
    background-color: white;
    padding: 0.25rem;

    button {
      border: none;
      border-radius: 8px;
    }

    .clear {
      width: 100%;
      text-align: center;
      padding: 0.5rem;
      background-color: white;
      color: black;
      align-items: center;
      justify-content: center;
      display: flex;
      cursor: pointer;

      &:hover {
        background-color: #e2e2e2;
      }
      :global(svg) {
        width: 1.125rem;
        height: 1.125rem;
      }
    }

    button:not(.clear) {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid black;

      &:hover {
        transform: scale(1.25);
      }
    }
  }
</style>
