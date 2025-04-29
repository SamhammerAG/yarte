<svelte:options customElement="yarte-hyperlink-bubble-menu" />

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

  let isEditModeActive = $state(false);
  let urlInputField = $state("");

  onMount(() => {
    urlInputField = editor?.getAttributes("link").href;
    if (urlInputField === undefined) {
      isEditModeActive = true;
    }
  });

  function enterEditMode() {
    isEditModeActive = true;
  }

  function cancelEdit() {
    urlInputField = editor?.getAttributes("link").href;
    closeMenu();
  }

  function saveLink() {
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    if (urlInputField) editor.chain().focus().extendMarkRange("link").setLink({ href: urlInputField }).run();
    else removeLink();

    closeMenu();
  }

  function removeLink() {
    //@ts-expect-error: This error is expected because the editor is initilized outside of the Web-component
    editor.chain().focus().unsetLink().run();
    closeMenu();
  }

  function outsideClick() {
    document.dispatchEvent(bubbleMenuEvent);
    editor.chain().focus().run();
  }

  function closeMenu() {
    document.dispatchEvent(bubbleMenuEvent);
    const { from, to } = editor.state.selection;
    editor.commands.focus("start");
    editor.commands.setTextSelection({ from, to });
    isEditModeActive = false;
  }
</script>

{#if editor}
  <div use:clickOutside onoutclick={outsideClick} class="bubble-menu">
    {#if isEditModeActive}
      <input bind:value={urlInputField} type="text" placeholder="https://example.com" />
      <button class="confirm" onclick={saveLink}>
        <Icon content={CheckIcon} />
      </button>
      <button class="decline" onclick={cancelEdit}>
        <Icon content={CancelIcon} />
      </button>
    {:else}
      <a href={urlInputField} title={urlInputField} target="_blank" rel="noopener noreferrer">
        <span>{urlInputField} </span>
      </a>
      <button onclick={enterEditMode}>
        <Icon content={LinkIcon} />
      </button>
      <button onclick={removeLink}>
        <Icon content={UnlinkIcon} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .bubble-menu {
    background-color: #fff;
    border: 1px solid #3d25140d;
    border-radius: 8px;
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
    border-radius: 8px;
    background-color: white;
    flex: 40%;
  }

  input {
    display: flex;
    padding: 0.25rem;
    background-color: white;
    color: black;
    outline: none;
  }
</style>
