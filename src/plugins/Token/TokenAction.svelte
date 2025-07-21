<svelte:options customElement="tiptob-token-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import LinkIcon from "../../../icons/link.svg?raw";
  import Icon from "../../base/Icon.svelte";
  import CheckIcon from "../../../icons/check-line.svg?raw";
  import CloseIcon from "../../../icons/close-line.svg?raw";
  import DropdownButton from "../../base/DropdownButton.svelte";

  let { editor, language = "en" }: { editor: Editor; language: "de" | "en" } = $props();

  let dropdownOpen = $state(false);

  let selected = $state("Select option");

  const options = [
    "{Option 1}",
    "{Option 2}",
    "{Option 3}",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
  ];

  const translations: Record<string, Record<string, string>> = {
    de: {
      main: "Token auswählen",
      confirm: "Token einfügen",
      close: "Abbrechen",
    },
    en: {
      main: "choose Token",
      confirm: "insert Token",
      close: "Abort",
    },
  };

  function confirmToken() {
    editor.commands.insertContent(selected);
    dropdownOpen = false;
  }
</script>

{#if editor}
  <DropdownButton {editor} bind:dropdownOpen key="link" icon={LinkIcon} text="Token" tooltip={translations[language]["main"]}>
    <div class="dropdown-content">
      <div class="menu">
        {#each options as option (option)}
          <button class="menu-item" onclick={() => (selected = option)}>
            {option}
          </button>
        {/each}
      </div>

      <div class="button-wrapper">
        <button type="button" class="confirm" onclick={confirmToken} title={translations[language]["confirm"]}>
          <Icon content={CheckIcon} />
        </button>
        <button type="button" class="close" onclick={() => (dropdownOpen = false)} title={translations[language]["close"]}>
          <Icon content={CloseIcon} />
        </button>
      </div>
    </div>
  </DropdownButton>
{/if}

<style>
  .dropdown-content {
    display: flex;
    flex-direction: column;
    width: 200px;
    max-height: 250px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 6px;
    overflow: hidden;
  }

  .menu {
    flex: 1;
    overflow-y: auto;
    max-height: 200px;
  }

  .menu-item {
    padding: 8px 12px;
    border: none;
    background: transparent;
    text-align: left;
    cursor: pointer;
    width: 100%;
    font-size: 14px;
  }

  .menu-item:focus,
  .menu-item:hover {
    background: #f0f0f0;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-evenly;
    padding: 8px;
    border-top: 1px solid #eee;
    background: white;
    position: sticky;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40%;
      border: none;
      border-radius: 8px;
      background-color: var(--tiptob-bg-button, rgb(167, 167, 167));
      &:hover:enabled {
        background-color: var(--tiptob-bg-button-hover, #e2e2e2);
      }
    }
  }
</style>
