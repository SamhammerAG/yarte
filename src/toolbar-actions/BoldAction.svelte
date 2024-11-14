<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import BoldIcon from "../../icons/bold.svg?raw";

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

    const action = () => editor.chain().focus().toggleBold().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={BoldIcon} />
