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
import { ImageExtension } from "./Image";
import { map } from "lit/directives/map.js";
import { editorStyles } from "./EditorStyles";
import buttonIcons from "./Icons";

export class RichTextEditor extends LitElement {
	static properties = {
		readonly: { type: Boolean },
		content: { type: String },
		toolbar: { type: Array },

		editor: {},
		extensions: {},
	};

	constructor() {
		super();

		this.extensions = [
			Document,
			Text,
			TextStyle,
			Bold,
			Italic,
			Link,
			Strike,
			History,
			ImageExtension,
			Underline,
			Paragraph,
			Highlight,
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
		];
	}

	connectedCallback() {
		super.connectedCallback();
		this.toolbar = this.getAttribute("toolbar")
			.split(",")
			.map((options) => options.trim().toLowerCase());
		this.content = this.getAttribute("content");
		this.editor = this.initializeEditor();
	}

	initializeEditor() {
		return new Editor(this.defaultSettings());
	}

	getToolbarButton(name) {
		const toolbarButtons = new Map(
			Object.entries({
				bold: html` <button
					class="bold button ${classMap({
						active: this.editor.isActive("bold"),
					})}"
					@click=${this.toggleBold}
				>
					${buttonIcons.get("bold")}
				</button>`,

				italic: html`
					<button
						class="italic button ${classMap({
							active: this.editor.isActive("italic"),
						})}"
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
						@click=${this.toggleUnderline}
					>
						${buttonIcons.get("underline")}
					</button>
				`,

				highlight: html`
					<button
						class="highlight button ${classMap({
							active: this.editor.isActive("highlight"),
						})}"
						@click=${this.toggleHighlight}
					>
						${buttonIcons.get("highlight")}
					</button>
				`,

				color: html`
					<button
						class="color button ${classMap({
							active: this.editor.isActive("textStyle", { color: /.*/ }),
						})}"
						@click=${this.toggleColor}
					>
						${buttonIcons.get("color")}
					</button>
				`,

				image: html`
					<button class="image button" @click=${this.setImage}>
						${buttonIcons.get("image")}
					</button>
				`,

				table: html`
					<div class="container">
						<button class="table button" @click=${this.toggleDropdown}>
							${buttonIcons.get("table")}
						</button>

						<div class="dropdown" id="dropdown">
							<div class="dropdown-container" @click=${this.setTable}>
								Create Table
							</div>
							<input class="inputTable rows" id="rows" placeholder="3" />
							x
							<input class="inputTable cols" id="cols" placeholder="3" />
						</div>
					</div>
				`,

				textalign: html`
					<button
						class="text-align-left button ${classMap({
							active: this.editor.isActive({ textAlign: "left" }),
						})}"
						@click=${this.textAlignLeft}
					>
						${buttonIcons.get("align-left")}
					</button>
					<button
						class="text-align-center button ${classMap({
							active: this.editor.isActive({ textAlign: "center" }),
						})}"
						@click=${this.textAlignCenter}
					>
						${buttonIcons.get("align-center")}
					</button>
					<button
						class="text-align-right button ${classMap({
							active: this.editor.isActive({ textAlign: "right" }),
						})}"
						@click=${this.textAlignRight}
					>
						${buttonIcons.get("align-right")}
					</button>
					<button
						class="text-align-justify button ${classMap({
							active: this.editor.isActive({ textAlign: "justify" }),
						})}"
						@click=${this.textAlignJustify}
					>
						${buttonIcons.get("align-justify")}
					</button>
				`,
			})
		);
		return toolbarButtons.get(name);
	}

	defaultSettings() {
		return {
			element: this.createEditorRootElement(),
			editable: !this.readonly,
			extensions: this.extensions,
			content: this.content,
			onCreate: () => {
				this.contentChange();
			},
			onUpdate: ({ editor }) => {
				this.requestUpdate();
				this.contentChange();
			},
			onSelectionUpdate: () => {
				this.requestUpdate();
			},
		};
	}

	createEditorRootElement() {
		if (this.renderRoot.querySelector(".editor")) {
			return this.renderRoot.querySelector(".editor");
		}

		const editor = document.createElement("div");
		editor.setAttribute("class", "editor");

		this.renderRoot.appendChild(editor);

		return editor;
	}

	contentChange() {
		this.dispatch("contentChange", {
			html: this.editor.getHTML(),
			json: this.editor.getJSON(),
		});
	}

	dispatch(eventName, detail) {
		this.dispatchEvent(new CustomEvent(eventName, { detail }));
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.editor.destroy();
	}

	render() {
		return html` <div class="editor-wrapper">
			<div class="toolbar">
				${map(this.toolbar, (name) => this.getToolbarButton(name))}
			</div>
			${this.createEditorRootElement()}
		</div>`;
	}

	static styles = [editorStyles];

	toggleDropdown() {
		const dropdownMenu = this.renderRoot.getElementById("dropdown");
		dropdownMenu.classList.toggle("show");
	}

	toggleBold() {
		this.editor.chain().focus().toggleBold().run();
	}

	toggleColor() {
		this.editor.chain().focus().setColor("red").run();
	}

	setTable() {
		const rows = this.renderRoot.getElementById("rows");
		const cols = this.renderRoot.getElementById("cols");
		if (rows.value === "" || cols.value === "")
			this.editor.chain().focus().insertTable().run();
		else
			this.editor
				.chain()
				.focus()
				.insertTable({
					rows: rows.value,
					cols: cols.value,
				})
				.run();
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

	//Erweitern mit Farbauswahl
	toggleHighlight() {
		this.editor.chain().focus().toggleHighlight({ color: "#94FADB" }).run();
	}

	toggleUnderline() {
		this.editor.chain().focus().toggleUnderline().run();
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

customElements.define("rich-text-editor", RichTextEditor);
