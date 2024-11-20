<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import LinkIcon from "../../../icons/link.svg?raw";
  import { showLinkBubbleMenu } from "./stores";
  import SimpleButton from "../../base/SimpleButton.svelte";

  interface Props {
    editor: Editor;
    disabled: boolean;
    activeButtons: string[];
    key: string;
  }

  let {
    editor,
    disabled,
    activeButtons,
    key
  }: Props = $props();

  const action = () => {
    showLinkBubbleMenu.set(true);
    editor.chain().focus().run();
  };
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={LinkIcon} />
