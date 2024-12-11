<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";

  interface Props {
    editor: Editor;
    key: string;
    action: Function;
    icon: string;
  }
  let { editor, key, action, icon }: Props = $props();
  let active = $state(false);

  onMount(() => {
    editor.on("transaction", () => {
      active = editor.isActive(key);
    });
  });
</script>

<button class:active onclick={() => action()}>
  <Icon content={icon} />
</button>

<style>
  button {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 6px 1px 5px 0;
    height: 28px;
    border: none;
    border-radius: var(--button-border-radius);
    background-color: var(--button-color);

    &.active {
      background-color: var(--button-active);
    }

    &:hover {
      background-color: var(--button-hover);
    }
  }
</style>
