<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import ClearIcon from "../../icons/format-clear.svg?raw";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().unsetAllMarks().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={ClearIcon} />
