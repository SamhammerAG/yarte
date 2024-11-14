<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import RedoIcon from "../../icons/arrow-go-forward-line.svg?raw";

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
