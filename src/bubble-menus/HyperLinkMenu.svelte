<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import CheckIcon from "../../icons/check-line.svg?raw";
  import CancelIcon from "../../icons/close-line.svg?raw";
  import LinkIcon from "../../icons/link.svg?raw";
  import { showLinkBubbleMenu, currentFocusLink } from "../stores";
  import { clickOutside } from "../utils/click-outside";

  export let editor: Editor;

  let isEditMode = false;
  let inputUrl = "";

  function setLink() {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: inputUrl })
      .run();
    isEditMode = false;
    inputUrl = "";
    $showLinkBubbleMenu = false;
    $currentFocusLink = inputUrl;
  }

  function removeLink() {
    editor.chain().focus().unsetLink().run();
    $showLinkBubbleMenu = false;
  }

  function cancelEditMode() {
    if ($currentFocusLink === undefined) editor.chain().focus().run();
    isEditMode = false;
  }

  function outsideClick() {
    $showLinkBubbleMenu = false;
  }
</script>

<div class="bubble-menu" use:clickOutside on:outclick={outsideClick}>
  {#if isEditMode || $currentFocusLink === undefined}
    <input
      bind:value={inputUrl}
      id="link-input"
      type="text"
      placeholder="https://example.com"
    />
    <button class="confirm" on:click={setLink}>
      {@html CheckIcon}
    </button>
    <button class="decline" on:click={cancelEditMode}>
      {@html CancelIcon}
    </button>
  {:else}
    <a href={$currentFocusLink} title={$currentFocusLink}>
      <span
        >{$currentFocusLink === "" || $currentFocusLink === null
          ? "This link has no URL"
          : $currentFocusLink}
      </span>
    </a>
    <button on:click={() => (isEditMode = true)}>
      {@html LinkIcon}
    </button>
    <button on:click={removeLink}>
      {@html LinkIcon}
    </button>
  {/if}
</div>

<style>
  .bubble-menu {
    background-color: #fff;
    border: 1px solid #3d25140d;
    border-radius: 0.7rem;
    box-shadow:
      0px 12px 33px 0px rgba(0, 0, 0, 0.06),
      0px 3.618px 9.949px 0px rgba(0, 0, 0, 0.04);
    display: flex;
    padding: 0.2rem;

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
    border-radius: 0.3rem;
    background-color: var(--button-color);
    flex: 40%;

    & svg {
      width: 1rem;
      height: 1rem;
      color: var(--icon-text-color);
    }
  }

  & input {
    display: flex;
    padding: 0.25rem;
    flex: 100%;
    background-color: var(--button-color);
    color: var(--icon-text-color);
    outline: none;
  }
</style>
