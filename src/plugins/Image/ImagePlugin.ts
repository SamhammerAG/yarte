import Image from "@tiptap/extension-image";
import type { EditorPlugin } from "../../../types/EditorPlugin";
import ImageUploadAction from "./ImageUploadAction.svelte";
import { Plugin } from "@tiptap/pm/state";

export const ImagePlugin: (uploadCallback: Function) => EditorPlugin = (uploadCallback: Function) => {
  return {
    toolbarButton: ImageUploadAction,
    extensions: [
      Image.extend({
        addProseMirrorPlugins: () => {
          return [
            new Plugin({
              props: {
                handlePaste: (view, event) => {
                  const hasFiles =
                    event.clipboardData &&
                    event.clipboardData.files &&
                    event.clipboardData.files.length;

                  if (!hasFiles) {
                    return;
                  }

                  const images = Array.from(event.clipboardData.files).filter(
                    (file) => {
                      return file.type.includes("image/");
                    }
                  );

                  if (images.length === 0) {
                    return;
                  }

                  event.preventDefault();

                  const { schema } = view.state;

                  for (const image of images) {
                    uploadCallback(image).then((img: String) => {
                      const node = schema.nodes.image.create({
                        src: img,
                      });
                      const transaction =
                        view.state.tr.insert(view.state.selection.from, node);
                      view.dispatch(transaction);
                    });
                  }
                },
              },
            }),
          ];
        },
      })
    ],
    name: "image",
  }
};