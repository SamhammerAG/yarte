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
  }

  let { editor, key, action, icon, tooltip }: Props = $props();

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

<button {disabled} class:highlighted onclick={() => action()} title={disabled ? "" : tooltip}>
  <Icon content={icon} />
</button>

<style>
  button {
    display: flex;
    align-items: center;

    margin: 0.5rem 0;
    border: none;
    border-radius: 0.25rem;
    background-color: var(--tiptob-bg-button, white);

    &:hover:enabled {
      background-color: var(--tiptob-bg-button-hover, #f0f0f0);
    }
  }

  button:enabled {
    cursor: pointer;
  }
  button.highlighted:enabled {
    background-color: var(--tiptob-bg-button-highlighted, #f0f7ff);

    :global(svg) {
      fill: #2977ff;
    }
  }
</style>
