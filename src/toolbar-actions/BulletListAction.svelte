<script lang="ts">
    import type { Editor } from "@tiptap/core";
    import SimpleButton from "./base/SimpleButton.svelte";
    import BulletListIcon from "../../icons/list-unordered.svg?raw";

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

    const action = () => editor.chain().focus().toggleBulletList().run();
</script>

<SimpleButton {key} {disabled} {activeButtons} {action} icon={BulletListIcon} />
