<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../types/Action";
  import Button from "./action-buttons/SimpleButton.svelte";
  import ActionDefinitions from "./ActionDefinitions";
  import ExampleButton from "./action-buttons/ExampleButton.svelte";
  import TextAlignButton from "./action-buttons/TextAlignButton.svelte";

  export let editor: Editor;
  export let toolbar: string[];
  export let disabled: boolean;
  export let activeButtons: string[] = [];
  export let imageUpload: Function;

  function getConfiguredToolbarActions(): Action[] {
    const availableActions = ActionDefinitions.getActions({ imageUpload });
    const configuredActions: Action[] = [];

    for (const key of toolbar) {
      const action = availableActions.find((a) => a.key === key);

      if (action) {
        configuredActions.push(action);
      } else {
        console.warn(`toolbar action not found: ${key}`);
      }
    }

    return configuredActions;
  }
</script>

<div class="toolbar">
  <ExampleButton
    {disabled}
    {activeButtons}
    action={ActionDefinitions.TextAlign}
  />

  {#each getConfiguredToolbarActions() as action}
    {#if action.key === ActionDefinitions.TextAlign.key}
      <TextAlignButton {editor} {disabled} {activeButtons} {action} />
    {:else}
      <Button {editor} {disabled} {activeButtons} {action} />
    {/if}
  {/each}
</div>
