<svelte:options customElement="yarte-text-align-button" />

<script lang="ts">
  import TextAlignRightIcon from "../../../icons/align-right.svg?raw";
  import TextAlignLeftIcon from "../../../icons/align-left.svg?raw";
  import TextAlignCenterIcon from "../../../icons/align-center.svg?raw";
  import TextAlignJustifyIcon from "../../../icons/align-justify.svg?raw";
  import DropdownButton from "../../base/DropdownButton.svelte";
  import Icon from "../../base/Icon.svelte";
  import type { Editor } from "@tiptap/core";

  let { editor, language = "en" }: { editor: Editor; language: "de" | "en" } = $props();

  const translations: Record<string, Record<string, string>> = {
    de: {
      main: "Textausrichtung",
      left: "Linksbündig",
      center: "Zentriert",
      right: "Rechtsbündig",
      justify: "Blocksatz",
    },
    en: {
      main: "Text alignment",
      left: "Align left",
      center: "Align center",
      right: "Align right",
      justify: "Justify",
    },
  };

  let disabled = $state(false);
  let highlighted = $state(false);

  const textAlignments: { name: string; icon: string; action: () => void }[] = [
    {
      name: "left",
      icon: TextAlignLeftIcon,
      action: () => {
        //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
        editor.chain().focus().setTextAlign("left").run();
        disabled = false;
      },
    },
    {
      name: "center",
      icon: TextAlignCenterIcon,
      action: () => {
        //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
        editor.chain().focus().setTextAlign("center").run();
        disabled = false;
      },
    },
    {
      name: "right",
      icon: TextAlignRightIcon,
      action: () => {
        //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
        editor.chain().focus().setTextAlign("right").run();
        disabled = false;
      },
    },
    {
      name: "justify",
      icon: TextAlignJustifyIcon,
      action: () => {
        //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
        editor.chain().focus().setTextAlign("justify").run();
        disabled = false;
      },
    },
  ];
</script>

{#if editor}
  <DropdownButton {editor} key="text-align" icon={TextAlignLeftIcon} tooltip={translations[language]["main"]}>
    {#each textAlignments as alignment}
      <button
        {disabled}
        class:highlighted
        onclick={() => alignment.action()}
        title={disabled ? "" : translations[language][alignment.name]}
      >
        <Icon content={alignment.icon} />
      </button>
    {/each}
  </DropdownButton>
{/if}

<style>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--yarte-bg-button, white);
    border: none;
    cursor: pointer;
    padding: 0.625rem;

    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }

    &:hover {
      background-color: var(--yarte-bg-button-hover, #e2e2e2);
    }

    :global(svg) {
      width: 1.125rem;
      height: 1.125rem;
      color: black;
    }
  }
</style>
