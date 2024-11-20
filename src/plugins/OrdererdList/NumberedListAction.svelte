<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import NumberedListIcon from "../../../icons/list-ordered.svg?raw";
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

    const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

<SimpleButton
    {key}
    {disabled}
    {activeButtons}
    {action}
    icon={NumberedListIcon}
/>
