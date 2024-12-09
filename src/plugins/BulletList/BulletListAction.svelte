<svelte:options customElement="bold-button" />

<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import BulletListIcon from "../../../icons/list-unordered.svg?raw";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
    key: string;
  }

  let { editor, disabled, activeButtons, key }: Props = $props();

  const action = () => editor.chain().focus().toggleBulletList().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={BulletListIcon} />
