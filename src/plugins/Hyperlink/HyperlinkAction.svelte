<svelte:options customElement="yarte-hyperlink-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import CheckIcon from "../../../icons/check-line.svg?raw";
  import UnlinkIcon from "../../../icons/link-unlink-m.svg?raw";
  import LinkIcon from "../../../icons/link.svg?raw";
  import Icon from "../../base/Icon.svelte";
  import { onMount } from "svelte";
  import DropdownButton from "../../base/DropdownButton.svelte";

  let { editor }: { editor: Editor } = $props();

  let tooltip = "Link";
  let dropdownOpen = $state(false);
  let urlInputField = $state("");

  onMount(() => {
    editor?.on("transaction", () => {
      if (editor.isActive("link")) {
        urlInputField = editor.getAttributes("link").href;
        dropdownOpen = true;
      } else {
        urlInputField = "";
      }
    });
  });

  function setLink() {
    if (!editor) return;
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    editor.commands.setLink({ href: urlInputField });

    dropdownOpen = false;
  }

  function removeLink() {
    if (!editor) return;
    editor.chain().focus().unsetMark("link", { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
    urlInputField = "";
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      setLink();
    }
  }
  $effect(() => {
    if (editor) {
      editor.on("transaction", () => {
        if (editor.isActive("link")) {
          urlInputField = editor.getAttributes("link").href;
          dropdownOpen = true;
        } else {
          urlInputField = "";
          dropdownOpen = false;
        }
      });
    }
  });
</script>

{#if editor}
  <DropdownButton {editor} bind:dropdownOpen key="link" icon={LinkIcon} {tooltip}>
    <div class="yarte-link-input-wrapper">
      <input
        bind:value={urlInputField}
        type="url"
        placeholder="Paste a link..."
        onkeydown={handleKeyDown}
        autocomplete="off"
        class="yarte-link-input"
      />
      <button type="button" class="confirm" onclick={setLink} disabled={!urlInputField}>
        <Icon content={CheckIcon} />
      </button>
      <button type="button" onclick={removeLink}>
        <Icon content={UnlinkIcon} />
      </button>
      <button type="button" onclick={removeLink}>
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
  }

  .yarte-link-input {
    display: flex;
    padding: 0.25rem;
    background-color: white;
    color: black;
    outline: none;
  }
</style>
