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
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";

export default class Extensions {
    public static Document = Document;
    public static Text = Text;
    public static Bold = Bold;
    public static Italic = Italic;
    public static Link = Link;
    public static Strike = Strike;
    public static History = History;
    public static Underline = Underline;
    public static Paragraph = Paragraph;
    public static BulletList = BulletList;
    public static OrderedList = OrderedList;
    public static Color = Color;
    public static TableCell = TableCell;
    public static TableRow = TableRow;
    public static TableHeader = TableHeader
    public static TextStyle = TextStyle;
    public static ListItem = ListItem;

    public static Highlight = Highlight.configure({
        multicolor: true
    });
    public static Table = Table.configure({
        resizable: true
    });
    public static TextAlign = TextAlign.configure({
        types: ["heading", "paragraph"]
    });

    public static Image = Image;
}