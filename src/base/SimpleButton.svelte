<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Icon from "./Icon.svelte";

  interface Props {
    editor: Editor;
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    action: Function;
    icon: string;
  }

  let { editor, key, action, icon }: Props = $props();

  $effect(() => {
    if (editor) {
      console.log("simple - readonly", editor?.options.editable);
    }
  });
</script>

<button disabled={!editor?.options.editable} class:active={editor?.isActive(key)} class={key} onclick={() => action()}>
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
