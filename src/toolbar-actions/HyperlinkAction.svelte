<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import DropdownButton from "./base/DropdownButton.svelte";
  import LinkIcon from "../../icons/link.svg?raw";
  import CheckIcon from "../../icons/check-line.svg?raw";
  import CancelIcon from "../../icons/close-line.svg?raw";

  export let key: string;
  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];

  let hyperlink: string = "";

  function setHyperlink() {
    editor.chain().focus().setLink({ href: hyperlink }).run();
    hyperlink = "";
  }
</script>

<DropdownButton {key} {disabled} {activeButtons} icon={LinkIcon}>
  <div class="hyperlink">
    <input
      type="text"
      placeholder="https://example.com"
      bind:value={hyperlink}
    />
    <button class="confirm" on:click={setHyperlink}>
      {@html CheckIcon}
    </button>
    <button class="decline" on:click={() => editor.chain().focus()}>
      {@html CancelIcon}
    </button>
  </div>
</DropdownButton>

<style>
  .hyperlink {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: var(--toolbar-color);

    & button {
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

      &.confirm svg {
        color: green;
      }

      &.decline svg {
        color: red;
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
  }
</style>
