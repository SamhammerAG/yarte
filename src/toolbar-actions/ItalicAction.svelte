<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import ItalicIcon from "../../icons/italic.svg?raw";

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

    const action = () => editor.chain().focus().toggleItalic().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={ItalicIcon} />
