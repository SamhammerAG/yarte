<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import TextAlignRightIcon from "../../icons/align-right.svg?raw";
  import TextAlignLeftIcon from "../../icons/align-left.svg?raw";
  import TextAlignCenterIcon from "../../icons/align-center.svg?raw";
  import TextAlignJustifyIcon from "../../icons/align-justify.svg?raw";
  import DropdownButton from "./base/DropdownButton.svelte";

  export let key: string;
  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  $: active = false;

  const textAlignments: { icon: string; action: Function }[] = [
    {
      icon: TextAlignLeftIcon,
      action: () => {
        editor.chain().focus().setTextAlign("left").run();
        active = false;
      },
    },
    {
      icon: TextAlignCenterIcon,
      action: () => {
        editor.chain().focus().setTextAlign("center").run();
        active = false;
      },
    },
    {
      icon: TextAlignRightIcon,
      action: () => {
        editor.chain().focus().setTextAlign("right").run();
        active = false;
      },
    },
    {
      icon: TextAlignJustifyIcon,
      action: () => {
        editor.chain().focus().setTextAlign("justify").run();
        active = false;
      },
    },
  ];
</script>

<DropdownButton
  {key}
  {disabled}
  {activeButtons}
  icon={TextAlignLeftIcon}
  bind:active
>
  {#each textAlignments as alignment}
    <button {disabled} on:click={() => alignment.action()}>
      {@html alignment.icon}
    </button>
  {/each}
</DropdownButton>

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--button-color);
    border: none;
    cursor: pointer;
    padding: 0.625rem;

    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }

    &:hover {
      background-color: var(--button-hover);
    }

    & svg {
      width: 1.125rem;
      height: 1.125rem;
      color: var(--icon-text-color);
    }
  }
</style>
