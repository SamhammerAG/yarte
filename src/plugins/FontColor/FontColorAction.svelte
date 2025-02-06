<svelte:options customElement="font-color-button" />

<script lang="ts">
  import FontColorIcon from "../../../icons/font-color.svg?raw";
  import EraserIcon from "../../../icons/eraser-line.svg?raw";
  import DropdownButton from "../../base/DropdownButton.svelte";
  import Icon from "../../base/Icon.svelte";
  import type Props from "../../../types/Props";

  let { editor, readonly }: Props = $props();
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
  <DropdownButton {editor} {readonly} {dropdownOpen} key="font-color" icon={FontColorIcon}>
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
    background-color: var(--toolbar-color);
    padding: 0.25rem;

    button {
      border: none;
      border-radius: var(--popout-border-radius);
    }

    .clear {
      width: 100%;
      text-align: center;
      padding: 0.5rem;
      background-color: var(--button-color);
      color: var(--icon-text-color);
      align-items: center;
      justify-content: center;
      display: flex;
      cursor: pointer;

      &:hover {
        background-color: var(--button-hover);
      }
    }

    button:not(.clear) {
      display: flex;
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid var(--icon-text-color);

      &:hover {
        transform: scale(1.25);
      }
    }
  }
</style>
