import { Editor } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import History from "@tiptap/extension-history";
import Link from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import { LitElement, html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import Image from "@tiptap/extension-image";
import { map } from "lit/directives/map.js";
import { editorStyles } from "./EditorStyles";
import buttonIcons from "./Icons";
import { Plugin } from "@tiptap/pm/state";
import { customElement, property } from "lit/decorators.js";

@customElement("rich-text-editor")
export class RichTextEditor extends LitElement {
  @property({ type: Boolean })
  readOnly: boolean = false;

  @property({ type: Array })
  toolbar?: string[] = [];

  @property({ type: String })
  content: string = "";

  @property({ attribute: false })
  imageUpload: any;

  editor: any;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.toolbar = this.getAttribute("toolbar")
      ?.split(",")
      .map((options) => options.trim().toLowerCase());
    this.editor = this.initializeEditor();
    //this.addCloseDropdownListener();
  }

  initializeEditor(): Editor {
    return new Editor({
      element: this.createEditorRootElement(),
      editable: !this.readOnly,
      extensions: [
        Document,
        Text,
        TextStyle,
        Bold,
        Italic,
        Link,
        Strike,
        History,
        Image.configure({
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
                      this.imageUpload(image).then((img: File) => {
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
        }),
        Underline,
        Paragraph,
        Highlight.configure({
          multicolor: true,
        }),
        BulletList,
        OrderedList,
        Table.configure({
          resizable: true,
        }),
        Color,
        TableCell,
        TableRow,
        TableHeader,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        ListItem,
      ],
      content: this.content,
      onCreate: () => {
        this.contentChange();
      },
      onUpdate: () => {
        this.requestUpdate();
        this.contentChange();
      },
      onSelectionUpdate: () => {
        this.requestUpdate();
      },
    });
  }

  addCloseDropdownListener() {
    window.onclick = (event) => {
      if (event) {
        var dropdowns = this.renderRoot.querySelectorAll("div.dropdown");
        var i;
        console.log(dropdowns);
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }

  getToolbarButton(name: string) {
    const toolbarButtons = new Map(
      Object.entries({
        spacer: html`<span class="spacer"></span>`,

        bold: html` <button
          class="bold button ${classMap({
            active: this.editor.isActive("bold"),
          })}"
          ?disabled=${this.readOnly}
          @click=${this.toggleBold}
        >
          ${buttonIcons.get("bold")}
        </button>`,

        italic: html`
          <button
            class="italic button ${classMap({
              active: this.editor.isActive("italic"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleItalic}
          >
            ${buttonIcons.get("italic")}
          </button>
        `,

        strike: html`
          <button
            class="strike button ${classMap({
              active: this.editor.isActive("strike"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleStrike}
          >
            ${buttonIcons.get("strike")}
          </button>
        `,

        bulletlist: html`
          <button
            class="bulletlist button ${classMap({
              active: this.editor.isActive("bulletList"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleBulletList}
          >
            ${buttonIcons.get("bullet-list")}
          </button>
        `,

        orderedlist: html`
          <button
            class="orderedlist button ${classMap({
              active: this.editor.isActive("orderedList"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleOrderedList}
          >
            ${buttonIcons.get("ordered-list")}
          </button>
        `,

        undo: html`
          <button
            class="undo button ${classMap({
              active: this.editor.isActive("undo"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleUndo}
          >
            ${buttonIcons.get("undo")}
          </button>
        `,

        redo: html`
          <button
            class="redo button ${classMap({
              active: this.editor.isActive("redo"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleRedo}
          >
            ${buttonIcons.get("redo")}
          </button>
        `,

        link: html`
          <button
            class="link button ${classMap({
              active: this.editor.isActive("link"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.setLinkButton}
          >
            ${buttonIcons.get("link")}
          </button>
        `,

        underline: html`
          <button
            class="underline button ${classMap({
              active: this.editor.isActive("underline"),
            })}"
            ?disabled=${this.readOnly}
            @click=${this.toggleUnderline}
          >
            ${buttonIcons.get("underline")}
          </button>
        `,

        removeformat: html`
          <button
            class="remove-format button"
            ?disabled=${this.readOnly}
            @click=${this.toggleRemoveFormat}
          >
            ${buttonIcons.get("remove-format")}
          </button>
        `,

        highlight: html`
          <div class="container">
            <button
              class="highlight button"
              ?disabled=${this.readOnly}
              @click=${this.toggleHighlightDropdown}
            >
              ${buttonIcons.get("highlight")}
            </button>
            <div class="dropdown vertical" id="highlightDropdown">
              <button
                class="unset-color button"
                @click=${this.unsetHighlightColor}
              >
                ${buttonIcons.get("unset-color")} Remove Color
              </button>
              <div class="select-color">
                <button
                  class="set-text-color red ${classMap({
                    active: this.editor.isActive("highlight", {
                      color: "#e91313",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setHighlight("#e91313");
                  }}
                ></button>
                <button
                  class="set-text-color neon-green${classMap({
                    active: this.editor.isActive("highlight", {
                      color: "#63f963",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setHighlight("#63f963");
                  }}
                ></button>
                <button
                  class="set-text-color blue${classMap({
                    active: this.editor.isActive("highlight", {
                      color: "#72cdfd",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setHighlight("#72cdfd");
                  }}
                ></button>
                <button
                  class="set-text-color yellow${classMap({
                    active: this.editor.isActive("highlight", {
                      color: "#fdfd77",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setHighlight("#fdfd77");
                  }}
                ></button>
                <button
                  class="set-text-color pink${classMap({
                    active: this.editor.isActive("highlight", {
                      color: "#fc7999",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setHighlight("#fc7999");
                  }}
                ></button>
              </div>
            </div>
          </div>
        `,

        color: html`
          <div class="container">
            <button
              class="color button"
              ?disabled=${this.readOnly}
              @click=${this.toggleColorDropdown}
            >
              ${buttonIcons.get("color")}
            </button>
            <div class="dropdown vertical" id="colorDropdown">
              <button
                class="unset-color button"
                @click=${this.unsetTextStyleColor}
              >
                ${buttonIcons.get("unset-color")} Remove Color
              </button>
              <div class="select-color">
                <button
                  class="set-text-color red ${classMap({
                    active: this.editor.isActive("textStyle", {
                      color: "#e91313",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setColor("#e91313");
                  }}
                ></button>
                <button
                  class="set-text-color green${classMap({
                    active: this.editor.isActive("textStyle", {
                      color: "#118800",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setColor("#118800");
                  }}
                ></button>
                <button
                  class="set-text-color blue${classMap({
                    active: this.editor.isActive("textStyle", {
                      color: "#72cdfd",
                    }),
                  })}"
                  ?disabled=${this.readOnly}
                  @click=${() => {
                    this.setColor("#72cdfd");
                  }}
                ></button>
              </div>
            </div>
          </div>
        `,

        image: html`
          <button
            ?disabled=${this.readOnly}
            class="image button"
            @click=${this.setImage}
          >
            ${buttonIcons.get("image")}
          </button>
        `,

        table: html`
          <div class="container">
            <button
              ?disabled=${this.readOnly}
              class="table button"
              @click=${this.toggleTableDropdown}
            >
              ${buttonIcons.get("table")}
            </button>

            <div class="dropdown horizontal" id="tableDropdown">
              <button class="create-table button" @click=${this.setTable}>
                Create Table
              </button>
              <input
                class="inputTable rows"
                type="number"
                min="1"
                id="rows"
                value="3"
              />
              x
              <input
                class="inputTable cols"
                type="number"
                min="1"
                id="cols"
                value="3"
              />
            </div>
          </div>
        `,

        textalign: html`
          <div class="container">
            <button
              class="text-align-left button"
              ?disabled=${this.readOnly}
              @click=${this.toggleAlignDropdown}
            >
              ${buttonIcons.get("align-left")}
            </button>
            <div class="dropdown vertical" id="alignDropdown">
              <button
                class="text-align-left button ${classMap({
                  active: this.editor.isActive({ textAlign: "left" }),
                })}"
                ?disabled=${this.readOnly}
                @click=${this.textAlignLeft}
              >
                ${buttonIcons.get("align-left")}
              </button>
              <button
                class="text-align-center button ${classMap({
                  active: this.editor.isActive({ textAlign: "center" }),
                })}"
                ?disabled=${this.readOnly}
                @click=${this.textAlignCenter}
              >
                ${buttonIcons.get("align-center")}
              </button>
              <button
                class="text-align-right button ${classMap({
                  active: this.editor.isActive({ textAlign: "right" }),
                })}"
                @click=${this.textAlignRight}
                ?disabled=${this.readOnly}
              >
                ${buttonIcons.get("align-right")}
              </button>
              <button
                class="text-align-justify button ${classMap({
                  active: this.editor.isActive({ textAlign: "justify" }),
                })}"
                ?disabled=${this.readOnly}
                @click=${this.textAlignJustify}
              >
                ${buttonIcons.get("align-justify")}
              </button>
            </div>
          </div>
        `,
      })
    );
    return toolbarButtons.get(name);
  }

  private createEditorRootElement(): HTMLElement {
    const editorElement = this.renderRoot.querySelector<HTMLElement>(".editor");

    if (editorElement) {
      return editorElement;
    }

    const newEditorElement = document.createElement("div");
    newEditorElement.classList.add("editor");
    this.renderRoot.appendChild(newEditorElement);

    return newEditorElement;
  }

  contentChange() {
    this.dispatch("contentChange", {
      html: this.editor.getHTML(),
      json: this.editor.getJSON(),
    });
  }

  dispatch(eventName: string, detail: {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.editor.destroy();
  }

  render() {
    return html` <div
      class="editor-wrapper ${classMap({ readonly: this.readOnly })}"
    >
      <div class="toolbar">
        ${map(this.toolbar, (name) => this.getToolbarButton(name))}
      </div>
      ${this.createEditorRootElement()}
    </div>`;
  }

  static styles = [editorStyles];

  toggleTableDropdown() {
    const dropdownMenu = this.renderRoot.querySelector("#tableDropdown");
    dropdownMenu?.classList.toggle("show");
  }

  toggleAlignDropdown() {
    const dropdownMenu = this.renderRoot.querySelector("#alignDropdown");
    dropdownMenu?.classList.toggle("show");
  }

  toggleColorDropdown() {
    const dropdownMenu = this.renderRoot.querySelector("#colorDropdown");
    dropdownMenu?.classList.toggle("show");
  }

  toggleHighlightDropdown() {
    const dropdownMenu = this.renderRoot.querySelector("#highlightDropdown");
    dropdownMenu?.classList.toggle("show");
  }

  toggleBold() {
    this.editor.chain().focus().toggleBold().run();
  }

  setColor(color: string) {
    this.editor.chain().focus().setColor(color).run();
  }

  unsetTextStyleColor() {
    this.editor.chain().focus().unsetColor().run();
  }

  unsetHighlightColor() {
    this.editor.chain().focus().unsetHighlight().run();
  }

  setTable() {
    const rowsElement =
      this.renderRoot.querySelector<HTMLInputElement>("#rows");
    const colsElement =
      this.renderRoot.querySelector<HTMLInputElement>("#cols");

    if (!rowsElement || !colsElement) return;

    const rows = parseInt(rowsElement.value, 10);
    const cols = parseInt(colsElement.value, 10);

    if (isNaN(rows) || isNaN(cols)) {
      this.editor.chain().focus().insertTable().run();
    } else {
      this.editor.chain().focus().insertTable({ rows, cols }).run();
    }
  }

  setImage() {
    this.editor
      .chain()
      .focus()
      .setImage({
        src: "https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg",
        alt: "suprised",
      })
      .run();
  }

  toggleBulletList() {
    this.editor.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList() {
    this.editor.chain().focus().toggleOrderedList().run();
  }

  toggleStrike() {
    this.editor.chain().focus().toggleStrike().run();
  }

  setHighlight(color: string) {
    this.editor.chain().focus().setHighlight({ color: color }).run();
  }

  toggleUnderline() {
    this.editor.chain().focus().toggleUnderline().run();
  }

  toggleRemoveFormat() {
    this.editor.chain().focus().unsetAllMarks().run();
  }

  setLinkButton() {
    const previousUrl = this.editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    this.editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }

  toggleUndo() {
    this.editor.chain().focus().undo().run();
  }

  toggleRedo() {
    this.editor.chain().focus().redo().run();
  }

  toggleItalic() {
    this.editor.chain().focus().toggleItalic().run();
  }

  textAlignLeft() {
    this.editor.chain().focus().setTextAlign("left").run();
  }

  textAlignCenter() {
    this.editor.chain().focus().setTextAlign("center").run();
  }

  textAlignRight() {
    this.editor.chain().focus().setTextAlign("right").run();
  }

  textAlignJustify() {
    this.editor.chain().focus().setTextAlign("justify").run();
  }
}
