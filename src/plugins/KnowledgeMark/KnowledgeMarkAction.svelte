<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import SimpleButton from "../../base/SimpleButton.svelte";
  import KnowledgeIcon from "../../../icons/brain-line.svg?raw";

  interface Props {
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
    key: string;
  }

  let { editor, disabled, activeButtons, key }: Props = $props();

  const action = () => editor.chain().toggleKnowledgeMark().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={KnowledgeIcon} />
