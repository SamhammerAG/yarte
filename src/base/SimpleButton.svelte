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
      highlighted = editor.isActive(key);
    });

    editor.on("update", () => {
      disabled = !editor.isEditable;
    });
  });
</script>

  <button {disabled} class:highlighted onclick={() => action()} title={ disabled ? '' : tooltip}>
    <Icon content={icon} />
  </button>

<style>


  button {
    display: flex;
    align-items: center;

    margin: 6px 1px 5px 0;
    height: 28px;
    border: none;
    border-radius: 4px;
    background-color: white;

    &:hover:enabled {
      background-color: #e2e2e2;
    }
  }

  button:enabled {
    cursor: pointer;
  }
  button.highlighted:enabled {
    background-color: #a6ccf7;
  }
</style>
