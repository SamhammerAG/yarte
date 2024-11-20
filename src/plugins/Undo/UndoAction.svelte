<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import UndoIcon from "../../../icons/arrow-go-back-line.svg?raw";
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

    const action = () => editor.chain().focus().undo().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={UndoIcon} />
