import { Plugin } from "@tiptap/pm/state";
import Image from "@tiptap/extension-image";

let customEvent = new CustomEvent("image-url", {
  detail: {
    file: {},
    url: "",
  },
});

export const ImageExtension = Image.configure({
  inline: true,
}).extend({
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
              customEvent.detail.file = image;
              this.parentElement.dispatchEvent(customEvent);
              const node = schema.nodes.image.create({
                src: customEvent.detail.url,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            }
          },
        },
      }),
    ];
  },
});
