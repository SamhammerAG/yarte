import { css } from "lit";

export const editorStyles = css`
  * {
    --shadow: rgba(0, 0, 0, 0.05) 0px 6px 10px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 0px 1px;
    --color: #166e67;
    --gap: 0.5rem;
    --radius: 5px;
    --darkgray: rgba(61, 37, 20, 0.12);
    --lightgray: rgba(61, 37, 20, 0.05);
    --silver: rgba(61, 37, 20, 0.08);
    --purple: #6a00f5;
    --selected: #a6ccf7;
    --hover: #f0f0f0;
  }

  .editor-wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 1rem 1rem -0.625rem rgba(34, 47, 62, 0.15),
      0 0 2.5rem 1px rgba(34, 47, 62, 0.15);
    border-radius: 10px;

    &.readonly {
      opacity: 0.6;
    }
  }

  .tiptap {
    min-height: 300px;
    word-wrap: break-word;
    white-space: break-spaces;
    overflow: hidden;
    position: relative;
    margin: 1.5rem;

    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 1px solid var(--darkgray);
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: var(--lightgray);
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: var(--silver);
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: var(--purple);
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }
    .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }
  }

  .tiptap:first-child {
    margin-top: 0;
  }

  .tiptap:focus {
    outline: none;
  }

  .toolbar {
    display: flex;
		flex-direction: row;
		flex-wrap: wrap;
    column-gap: 10px;
    margin: 0;
    padding: 5px;
    font-family: "Inter", sans-serif;
    box-shadow: var(--shadow);
  }

  .button {
		display: flex;
    background-color: white;
		padding: 3px 6px 3px 6px;
    align-items: center;
    cursor: pointer;
    border: 0;
    border-radius: 3px;
    position: relative;

    &.active:not([disabled]) {
      background: var(--selected);
      border: 0;
      box-shadow: none;
      color: #222f3e;
      position: relative;
    }
  }

  .button:hover,
  .button:focus {
    background-color: var(--hover);
  }

  .container {
		position: relative;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", sans-serif;
  }

  .dropdown {
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
		min-width: max-content;
		padding: 5px;
    box-shadow: var(--shadow);
    border-radius: var(--radius);
    margin-top: 0.3rem;
    background: white;
    z-index: 9999;

    visibility: hidden;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: all 0.1s cubic-bezier(0.16, 1, 0.5, 1);

		&.vertical {
			flex-direction: column;
			row-gap: var(--gap);
		}

		&.horizontal {
			flex-direction: row;
			column-gap: var(--gap);
		}
  }

	.set-text-color{
		min-width: 24px;
		min-height: 24px;
		border: none;
    border-radius: 3px;

		&.red {
			background-color: rgb(233, 19, 19);
		}
		&.green {
			background-color: rgb(17, 136, 0);
		}
		&.blue {
			background-color: rgb(114, 205, 253);
		}
	}

  .dropdown .dropdown-container:hover {
    background-color: var(--hover);
  }

  .inputTable {
    max-width: 24px;
  }

  .show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0rem);
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
