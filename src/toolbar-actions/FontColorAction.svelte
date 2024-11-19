<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import DropdownButton from "./base/DropdownButton.svelte";
  import FontColorIcon from "../../icons/font-color.svg?raw";
  import EraserIcon from "../../icons/eraser-line.svg?raw";

  interface Props {
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
    key: string;
  }

  let { editor, disabled, activeButtons, key }: Props = $props();
  let active = $state(false);

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    active = false;
  };

  const clearColor = () => {
    editor.chain().focus().unsetColor().run();
    active = false;
  };
  const colors: string[] = [
    "#E91313",
    "#118800",
    "#63F963",
    "#72CDFD",
    "#fc7999",
    "#FDFD77",
  ];
</script>

<DropdownButton
  {key}
  {disabled}
  {activeButtons}
  icon={FontColorIcon}
  bind:active
>
  <div class="color-picker">
    <button class="clear" onclick={clearColor}>
      {@html EraserIcon} Clear
    </button>

    {#each colors as color}
      <button
        style="background-color: {color};"
        onclick={() => setColor(color)}
        aria-label={color}
      ></button>
    {/each}
  </div>
</DropdownButton>

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

      :global(svg) {
        width: 1.125rem;
        height: 1.125rem;
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
