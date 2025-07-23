<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";

  interface Props {
    editor: Editor;
    key: string;
    action: () => void;
    icon: string;
    tooltip: string;
    text?: string;
    dropdownOpen?: boolean;
  }

  let { editor, key, action, icon, tooltip, text = "", dropdownOpen = $bindable(false) }: Props = $props();

  let highlighted = $state(false);
  let disabled = $state(false);

  onMount(() => {
    editor.on("transaction", () => {
      if (key === "textStyle") {
        highlighted = !!editor.getAttributes(key).color && editor.isActive(key);
      } else {
        highlighted = editor.isActive(key);
      }
    });

    editor.on("update", () => {
      disabled = !editor.isEditable;
    });
  });
</script>

<button {disabled} class:highlighted class:dropdownOpen onclick={() => action()} title={disabled ? "" : tooltip}>
  <Icon content={icon} />
  <div class="icon-text">{text}</div>
</button>

<style>
  button {
    display: flex;
    align-items: center;
    margin: 0.2rem 0;
    border: none;
    border-radius: 0.25rem;
    background-color: var(--tiptob-bg-button, #ffffff);

    &:hover:enabled {
      background-color: var(--tiptob-bg-button-hover, #f0f0f0);
    }
  }

  button:enabled {
    cursor: pointer;
  }
  button.dropdownOpen:enabled,
  button.highlighted:enabled {
    color: var(--tiptob-bg-icon-highlighted, #2977ff);
    background-color: var(--tiptob-bg-button-highlighted, #f0f7ff);

    :global(svg) {
      fill: var(--tiptob-bg-icon-highlighted, #2977ff);
    }
  }

  button.dropdownOpen:enabled::after,
  button.highlighted:enabled::after {
    color: var(--tiptob-bg-icon-highlighted, #2977ff);
  }
</style>
