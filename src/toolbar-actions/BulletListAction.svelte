<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import BulletListIcon from "../../icons/list-unordered.svg?raw";

    export let editor: Editor;
    export let disabled: boolean;
    export let activeButtons: string[];
    export let key: string;

    const action = () => editor.chain().focus().toggleBulletList().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={BulletListIcon} />
