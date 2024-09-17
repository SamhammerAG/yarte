<script lang="ts">
  import type { Editor } from "@tiptap/core";

  export let editor: Editor;
  export let key: string;
  export let disabled: boolean;
  export let activeButtons: string[] = [];
  export let action: Function;
  export let svgSrc: string;

  function handleClick() {
    action(editor);

    if (activeButtons.includes(key)) {
      activeButtons = activeButtons.filter((k) => k !== key);
    } else {
      activeButtons = [...activeButtons, key];
    }
  }
</script>

<!-- ############################### <HTML> ############################## -->

<button
  {disabled}
  class:active={activeButtons.includes(key)}
  on:click={() => handleClick()}
>
  <img src={svgSrc} alt={key} />
</button>

<!-- ############################## </HTML> ############################## -->

<style>
  button {
    margin: 0;
  }

  button.active {
    background: black;
    color: white;
  }
</style>
