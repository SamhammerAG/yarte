<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";

  interface Props {
    editor: Editor;
    key: string;
    action: () => void;
    icon: string;
    text?: string;
    tooltip: string;
  }

  let { editor, key, action, icon, text = "", tooltip }: Props = $props();

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
  {text}
</button>

<style>
  button {
    display: flex;
    align-items: center;

    margin: 6px 0px 5px 0px;
    height: 28px;
    border: none;
    border-radius: 4px;
    background-color: var(--tiptob-bg-button, white);

    &:hover:enabled {
      background-color: var(--tiptob-bg-button-hover, #e2e2e2);
    }
  }

  button:enabled {
    cursor: pointer;
  }
  button.highlighted:enabled {
    background-color: var(--tiptob-bg-button-highlighted, #a6ccf7);
  }
</style>
