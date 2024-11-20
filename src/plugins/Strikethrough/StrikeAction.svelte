<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "../../base/SimpleButton.svelte";
    import StrikeIcon from "../../../icons/strikethrough.svg?raw";

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

    const action = () => editor.chain().focus().toggleStrike().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={StrikeIcon} />
