import type { ImageOptions } from "@tiptap/extension-image";
import type { Extension, Node, Mark } from "@tiptap/core";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
import type { TableOptions } from "@tiptap/extension-table";
import type { HighlightOptions } from "@tiptap/extension-highlight";
import { Plugin } from "@tiptap/pm/state";

export const configureHighlight = (extension: Mark<HighlightOptions, any>): Mark<HighlightOptions, any> => {
  return extension.configure({
    multicolor: true
  });
}

export const configureTable = (extension: Node<TableOptions, any>): Node<TableOptions, any> => {
  return extension.configure({
    resizable: true
  })
}
export const configureTextAlign = (extension: Extension<TextAlignOptions, any>): Extension<TextAlignOptions, any> => {
  return extension.configure({
    types: ["heading", "paragraph"]
  });
}

export const configureImage = (extension: Node<ImageOptions, any>): Node<ImageOptions, any> => {
  return extension.configure({
    inline: true
  });
}

export const extendImage = (extension: Node<ImageOptions, any>, uploadCallback: Function): Node<ImageOptions, any> => {
  return extension.extend({
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
                uploadCallback(image).then((img: File) => {
                  const node = schema.nodes.image.create({
                    src: img,
                  });
                  const transaction =
                    view.state.tr.replaceSelectionWith(node);
                  view.dispatch(transaction);
                });
              }
            },
          },
        }),
      ];
    },
  });
};