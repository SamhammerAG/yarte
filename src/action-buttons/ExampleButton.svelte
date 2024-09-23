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
  <span>Hello World! :3</span>
</BaseDropdownButton>
