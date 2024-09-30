<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import CheckIcon from "../../icons/check-line.svg?raw";
  import CancelIcon from "../../icons/close-line.svg?raw";
  import LinkIcon from "../../icons/link.svg?raw";
  import { showLinkBubbleMenu } from "../stores";
  import { clickOutside } from "../utils/click-outside";

  export let editor: Editor;

  let editMode: boolean;
  let hyperlink: string = "";

  function setHyperlink() {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: hyperlink })
      .run();
    editMode = false;
  }

  $: if ($showLinkBubbleMenu) {
    hyperlink = getHyperlink();
  }

  function unsetHyperlink() {
    editor.chain().focus().unsetLink().run();
    $showLinkBubbleMenu = false;
  }

  function getHyperlink(): string {
    return editor.getAttributes("link").href || "";
  }

  function outsideclick() {
    console.log("wann?!?");
    $showLinkBubbleMenu = false;
  }
</script>

<div
  class="bubble-menu"
  on:loadeddata={() => console.log("loaded")}
  on:change={() => console.log("change")}
  use:clickOutside
  on:outclick={outsideclick}
>
  {#if editMode}
    <input
      bind:value={hyperlink}
      type="text"
      placeholder="https://example.com"
    />
    <button class="confirm" on:click={setHyperlink}>
      {@html CheckIcon}
    </button>
    <button class="decline" on:click={() => (editMode = false)}>
      {@html CancelIcon}
    </button>
  {:else}
    <a href={hyperlink} title={hyperlink}>
      <span>{hyperlink !== "" ? hyperlink : "This link has no URL"}</span>
    </a>
    <button on:click={() => (editMode = true)}>
      {@html LinkIcon}
    </button>
    <button on:click={unsetHyperlink}>
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

    &:hover {
      background-color: var(--button-hover);
    }

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
