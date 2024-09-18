<script lang="ts">
  //import type { Editor } from "@tiptap/core";
  import BaseDropdownButton from "./BaseDropdownButton.svelte";
  import type { Action } from "../../types/Action";

  //export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let action: Action;
</script>

<BaseDropdownButton {disabled} {activeButtons} {action}>
  <div slot="dropdown" class="dropdown">
    <img src="https://tinyurl.com/25oqeflb" alt={action.key} />
  </div>
</BaseDropdownButton>
