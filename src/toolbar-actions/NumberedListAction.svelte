<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import NumberedListIcon from "../../icons/list-ordered.svg?raw";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().toggleOrderedList().run();
</script>

<SimpleButton
    {key}
    {disabled}
    {activeButtons}
    {action}
    icon={NumberedListIcon}
/>
