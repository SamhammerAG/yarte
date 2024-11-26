import Image from "@tiptap/extension-image";
import { EditorPlugin } from "../EditorPlugin";
import ImageUploadAction from "./ImageUploadAction.svelte";
import { Plugin } from "@tiptap/pm/state";
import type { Extensions, Node } from "@tiptap/core";
import type { PluginToolbarButton } from "../../../types/PluginTypes";

export class ImagePlugin extends EditorPlugin {

  public name: string = "image";
  public toolbarButton: PluginToolbarButton = {
    component: ImageUploadAction,
    properties: null
  };

  constructor(uploadCallback: (file: File) => Promise<string>) {
    super();

    this.toolbarButton.properties = {
      uploadImageCallback: uploadCallback
    };
  }

  public getExtensions(): Extensions {
    return [this.getImageExtension()];
  }

  private getImageExtension(): Node {
    return Image.extend({
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
                  this.toolbarButton.properties.imageUpload(image).then((img: string) => {
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
    });
  }
}
