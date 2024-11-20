<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import RedoIcon from "../../../icons/arrow-go-forward-line.svg?raw";
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

    const action = () => editor.chain().focus().redo().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={RedoIcon} />
