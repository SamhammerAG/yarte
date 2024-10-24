<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import CheckIcon from "../../icons/check-line.svg?raw";
  import CancelIcon from "../../icons/close-line.svg?raw";
  import LinkIcon from "../../icons/link.svg?raw";
  import UnlinkIcon from "../../icons/link-unlink-m.svg?raw";
  import { showLinkBubbleMenu, currentFocusLink } from "../stores";
  import { clickOutside } from "../utils/click-outside";

  export let editor: Editor;

  let isEditMode = false;
  $: inputUrl = isEditMode ? $currentFocusLink : "";

  function enterEditMode() {
    isEditMode = true;
  }

  function declineEdit() {
    isEditMode = false;
    if ($currentFocusLink === undefined) {
      showLinkBubbleMenu.set(false);
      editor.chain().focus();
    }
  }

  function saveLink() {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: inputUrl })
      .run();

    currentFocusLink.set(inputUrl);
    showLinkBubbleMenu.set(false);
    isEditMode = false;
  }

  function removeLink() {
    editor.chain().focus().unsetLink().run();
    showLinkBubbleMenu.set(false);
  }

  function outsideClick() {
    showLinkBubbleMenu.set(false);
  }
</script>

<div class="bubble-menu" use:clickOutside on:outclick={outsideClick}>
  {#if isEditMode || $currentFocusLink === undefined}
    <input
      bind:value={inputUrl}
      type="text"
      placeholder="https://example.com"
    />
    <button class="confirm" on:click={saveLink}>
      {@html CheckIcon}
    </button>
    <button class="decline" on:click={declineEdit}>
      {@html CancelIcon}
    </button>
  {:else}
    <a
      href={$currentFocusLink}
      title={$currentFocusLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span
        >{$currentFocusLink === "" || $currentFocusLink === null
          ? "This link has no URL"
          : $currentFocusLink}
      </span>
    </a>
    <button on:click={enterEditMode}>
      {@html LinkIcon}
    </button>
    <button on:click={removeLink}>
      {@html UnlinkIcon}
    </button>
  {/if}
</div>

<style>
  .bubble-menu {
    background-color: #fff;
    border: 1px solid #3d25140d;
    border-radius: var(--popout-border-radius);
    box-shadow:
      0px 12px 33px 0px rgba(0, 0, 0, 0.06),
      0px 3.618px 9.949px 0px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;

    & button {
      background-color: unset;

      &:hover {
        background-color: #3d25141f;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0.25rem;
    border: none;
    border-radius: var(--popout-border-radius);
    background-color: var(--button-color);
    flex: 40%;

    & svg {
      width: 1.125rem;
      height: 1.125rem;
      color: var(--icon-text-color);
    }
  }

  & input {
    display: flex;
    padding: 0.25rem;
    background-color: var(--button-color);
    color: var(--icon-text-color);
    outline: none;
  }
</style>
