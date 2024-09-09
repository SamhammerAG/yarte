<script lang="ts">
  import type { Editor } from "@tiptap/core";

  export let editor: Editor;
  export let key: string;
  export let disabled: boolean;
  export let activeButtons: string[] = [];
  export let action: Function;

  function handleClick() {
    action(editor);

    if (activeButtons.includes(key)) {
      activeButtons = activeButtons.filter((k) => k !== key);
      return;
    } else {
      activeButtons = [...activeButtons, key];
    }
  }
</script>

<button
  {disabled}
  class:active={activeButtons.includes(key)}
  on:click={() => handleClick()}>{key}</button
>

<style>
  button {
    margin: 0;
  }

  button.active {
    background: black;
    color: white;
  }
</style>
