<svelte:options customElement="yarte-hyperlink-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import CheckIcon from "../../../icons/check-line.svg?raw";
  import UnlinkIcon from "../../../icons/link-unlink-m.svg?raw";
  import LinkIcon from "../../../icons/link.svg?raw";
  import OpenLink from "../../../icons/open-link.svg?raw";
  import Icon from "../../base/Icon.svelte";
  import DropdownButton from "../../base/DropdownButton.svelte";

  let { editor, language = "en" }: { editor: Editor, language: "de" | "en" } = $props();

  let dropdownOpen = $state(false);
  let urlInputField = $state("");

  const translations: Record<string, Record<string, string>> = {
    "de": {
      "main": "Link",
      "confirm": "Bestätigen",
      "open": "Öffnen",
      "remove": "Link entfernen/Schließen"
    },
    "en": {
      "main": "Link",
      "confirm": "Confirm",
      "open": "Open",
      "remove": "Remove/Close"
    }
  };

  $effect(() => {
    editor?.on("transaction", () => {
      if (editor.isActive("link")) {
        urlInputField = editor.getAttributes("link").href;
        dropdownOpen = true;
      } else {
        urlInputField = "";
        dropdownOpen = false;
      }
    });
  });

  function setLink() {
    const parsedUrl = urlInputField.includes(":") ? urlInputField : `https://${urlInputField}`;
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    editor.chain().focus().extendMarkRange("link").setLink({ href: parsedUrl }).run();
    dropdownOpen = false;
  }

  function removeLink() {
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    urlInputField = "";
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      setLink();
    }
  }

  function setFocus(element: HTMLInputElement) {
    element.focus();
  }
</script>

{#if editor}
  <DropdownButton {editor} bind:dropdownOpen key="link" icon={LinkIcon} tooltip={translations[language]["main"]}>
    <div class="yarte-link-input-wrapper">
      <input
        bind:value={urlInputField}
        type="url"
        placeholder="Paste a link..."
        onkeydown={handleKeyDown}
        autocomplete="off"
        class="yarte-link-input"
        use:setFocus
      />
      <button type="button" class="confirm" onclick={setLink} disabled={!urlInputField} title={!urlInputField ? "" : translations[language]["confirm"]}>
        <Icon content={CheckIcon} />
      </button>
      <button type="button" onclick={() => window.open(urlInputField, "_blank")} title={translations[language]["open"]}>
        <Icon content={OpenLink} />
      </button>
      <button type="button" onclick={removeLink} title={translations[language]["remove"]}>
        <Icon content={UnlinkIcon} />
      </button>
    </div>
  </DropdownButton>
{/if}

<style>
  .yarte-link-input-wrapper {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    padding: 0.25rem;
    background-color: white;
    border-radius: 8px;
    width: 100%;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.25rem;
    border: none;
    border-radius: 8px;
    background-color: white;
    flex: 40%;
    &:hover:enabled {
      background-color: #e2e2e2;
    }
  }
  .yarte-link-input {
    display: flex;
    padding: 0.25rem;
    background-color: white;
    color: black;
    outline: none;
    border: 0;
  }
</style>
