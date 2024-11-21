import Image from "@tiptap/extension-image";
import { EditorPlugin } from "../../../types/EditorPlugin";
import ImageUploadAction from "./ImageUploadAction.svelte";
import { Plugin } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/core";


export class ImagePlugin extends EditorPlugin {
  public name: string = "image";
  public toolbarButton: { component: any, customProperties?: any } = {
    component: ImageUploadAction,
  };



  constructor(editor: Editor, uploadCallback: (file: File) => Promise<string>) {
    super(editor);

    this.toolbarButton.customProperties = {
      imageUpload: uploadCallback
    };
  }

  public extensions = [
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
                  this.toolbarButton.customProperties.imageUpload(image).then((img: String) => {
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
  ];
}

/*
export const ImagePlugin: (uploadCallback: Function) => EditorPlugin = (uploadCallback: Function) => {
  return {
    toolbarButton: {
      component: ImageUploadAction,
      properties: { callback: uploadCallback }
    },
    extensions: ,
    name: "image",
  }
};
*/