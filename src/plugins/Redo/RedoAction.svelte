<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import RedoIcon from "../../../icons/arrow-go-forward-line.svg?raw";
    import SimpleButton from "../../base/SimpleButton.svelte";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().redo().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={RedoIcon} />
