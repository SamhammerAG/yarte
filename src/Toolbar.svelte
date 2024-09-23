<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import type { Action } from "../types/Action";
  import SimpleButton from "./action-buttons/SimpleButton.svelte";
  import ActionDefinitions from "./ActionDefinitions";
  import TextAlignButton from "./action-buttons/TextAlignButton.svelte";
  import ColorPickButton from "./action-buttons/ColorPickButton.svelte";
  import HyperlinkButton from "./action-buttons/HyperlinkButton.svelte";
  import TableButton from "./action-buttons/TableButton.svelte";
  import ImageUploadButton from "./action-buttons/ImageUploadButton.svelte";

  export let editor: Editor;
  export let toolbar: string[];
  export let disabled: boolean;
  export let activeButtons: string[] = [];
  export let imageUpload: (file: File) => Promise<string>;

  //remove for final version
  imageUpload = () =>
    new Promise(() => {
      console.log("Test");
      return "test";
    });

  function getConfiguredToolbarActions(): (Action | "|")[] {
    const availableActions = ActionDefinitions.getActions({ imageUpload });
    const configuredActions: (Action | "|")[] = [];

    for (const key of toolbar) {
      const action = availableActions.find((a) => a.key === key);

      if (action) {
        configuredActions.push(action);
      } else if (key === "|") {
        configuredActions.push(key);
      } else {
        console.warn(`toolbar action not found: ${key}`);
      }
    }

    return configuredActions;
  }
</script>

<div class="toolbar">
  {#each getConfiguredToolbarActions() as action}
    {#if action === "|"}
      <div class="spacer"></div>
    {:else if action.key === ActionDefinitions.Image(imageUpload).key}
      <ImageUploadButton {editor} {disabled} {action} />
    {:else if action.key === ActionDefinitions.TextAlign.key}
      <TextAlignButton {editor} {disabled} {activeButtons} {action} />
    {:else if action.key === ActionDefinitions.Color.key || action.key === ActionDefinitions.Highlight.key}
      <ColorPickButton {editor} {disabled} {activeButtons} {action} />
    {:else if action.key === ActionDefinitions.Link.key}
      <HyperlinkButton {editor} {disabled} {activeButtons} {action} />
    {:else if action.key === ActionDefinitions.Table.key}
      <TableButton {editor} {disabled} {activeButtons} {action} />
    {:else}
      <SimpleButton {editor} {disabled} {activeButtons} {action} />
    {/if}
  {/each}
</div>

<style>
  .toolbar {
    display: flex;
    flex-flow: row wrap;
    gap: 0.25rem;
    box-shadow: var(--shadow);
    background-color: var(--toolbar-color);
    padding: 0.25rem;

    & .spacer {
      width: 1px;
      margin: 0 0.25rem;
      background-color: var(--icon-text-color);
    }

    & > button,
    > .dropdown-wrapper > button {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0.25rem;
      border: none;
      border-radius: 0.3rem;
      background-color: var(--button-color);

      &.active {
        background-color: var(--button-active);
      }

      &:hover {
        background-color: var(--button-hover);
      }

      & svg {
        width: 1.25rem;
        height: 1.25rem;
        color: var(--icon-text-color);
      }
    }
  }
</style>
