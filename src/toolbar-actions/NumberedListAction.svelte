<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import NumberedListIcon from "../../icons/list-ordered.svg?raw";

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

    const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

<SimpleButton
    {key}
    {disabled}
    {activeButtons}
    {action}
    icon={NumberedListIcon}
/>
