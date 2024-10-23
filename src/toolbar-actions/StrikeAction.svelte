<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import StrikeIcon from "../../icons/strikethrough.svg?raw";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().toggleStrike().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={StrikeIcon} />
