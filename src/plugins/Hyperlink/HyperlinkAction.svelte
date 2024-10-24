<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import LinkIcon from "../../../icons/link.svg?raw";
  import { showLinkBubbleMenu } from "./stores";
  import SimpleButton from "../../base/SimpleButton.svelte";

  export let editor: Editor;
  export let disabled: boolean;
  export let activeButtons: string[];
  export let key: string;

  const action = () => {
    showLinkBubbleMenu.set(true);
    editor.chain().focus().run();
  };
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={LinkIcon} />
