<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../../types/Action";

  export let editor: Editor;
  export let action: Action;
  export let activeButtons: string[];
  export let disabled: boolean;

  function handleClick() {
    action.buttonAction(editor);

    if (activeButtons.includes(action.key)) {
      activeButtons = activeButtons.filter((k) => k !== action.key);
    } else {
      activeButtons = [...activeButtons, action.key];
    }
  }
</script>

<button
  {disabled}
  class:active={activeButtons.includes(action.key)}
  on:click={handleClick}
>
  <img src={action.buttonIcon} alt={action.key} />
</button>
