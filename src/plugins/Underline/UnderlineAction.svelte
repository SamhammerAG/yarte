<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "../../base/SimpleButton.svelte";
    import UnderlineIcon from "../../../icons/underline.svg?raw";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().toggleUnderline().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={UnderlineIcon} />
