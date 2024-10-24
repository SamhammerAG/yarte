<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import UndoIcon from "../../../icons/arrow-go-back-line.svg?raw";
    import SimpleButton from "../../base/SimpleButton.svelte";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().undo().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={UndoIcon} />
