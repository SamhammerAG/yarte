<svelte:options customElement="hyperlink-menu" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";

  import CheckIcon from "../../../icons/check-line.svg?raw";
  import CancelIcon from "../../../icons/close-line.svg?raw";
  import LinkIcon from "../../../icons/link.svg?raw";
  import UnlinkIcon from "../../../icons/link-unlink-m.svg?raw";
  import { clickOutside } from "../../utils/click-outside";
  import Icon from "../../base/Icon.svelte";
  import { onMount } from "svelte";

  const bubbleMenuEvent = new CustomEvent("showLinkBubbleMenu", { detail: { show: false } });

  let { editor }: { editor: Editor } = $props();

  let editMode = $state(false);
  let inputUrl = $state("");

  onMount(() => {
    inputUrl = editor?.getAttributes("link").href;
    if (inputUrl === undefined) {
      editMode = true;
    }
  });

  function enterEditMode() {
    editMode = true;
  }

  function cancelEdit() {
    inputUrl = editor?.getAttributes("link").href;
    closeMenu();
  }

  function saveLink() {
    editor.chain().focus().extendMarkRange("link").setLink({ href: inputUrl }).run();
    closeMenu();
  }

  function removeLink() {
    editor.chain().focus().unsetLink().run();
    closeMenu();
  }

  function closeMenu() {
    editMode = false;
    document.dispatchEvent(bubbleMenuEvent);
  }
</script>

<div use:clickOutside onoutclick={closeMenu} class="bubble-menu">
  {#if editMode}
    <input bind:value={inputUrl} type="text" placeholder="https://example.com" />
    <button class="confirm" onclick={saveLink}>
      <Icon content={CheckIcon} />
    </button>
    <button class="decline" onclick={cancelEdit}>
      <Icon content={CancelIcon} />
    </button>
  {:else}
    <a href={inputUrl} title={inputUrl} target="_blank" rel="noopener noreferrer">
      <span>{inputUrl === "" || inputUrl === null ? "This link has no URL" : inputUrl} </span>
    </a>
    <button onclick={enterEditMode}>
      <Icon content={LinkIcon} />
    </button>
    <button onclick={removeLink}>
      <Icon content={UnlinkIcon} />
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

    button {
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
  }

  input {
    display: flex;
    padding: 0.25rem;
    background-color: var(--button-color);
    color: var(--icon-text-color);
    outline: none;
  }
</style>
