<script lang="ts">
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";
  import type Props from "../../types/Props";

  interface ButtonProps extends Props {
    key: string;
    action: Function;
    icon: string;
  }

  let { editor, key, action, icon, readonly }: ButtonProps = $props();
  let highlighted = $state(false);

  onMount(() => {
    editor.on("transaction", () => {
      highlighted = editor.isActive(key);
    });
  });
</script>

<button disabled={readonly} class:highlighted onclick={() => action()}>
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

    &.highlighted {
      background-color: var(--button-active);
    }

    &:hover {
      background-color: var(--button-hover);
    }
  }

  button:disabled,
  button[disabled] {
    background-color: red;
  }
</style>
