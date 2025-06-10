<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Icon from "./Icon.svelte";
  import { onMount } from "svelte";
  import { computePosition, shift, offset, arrow } from "@floating-ui/dom";

  interface Props {
    editor: Editor;
    key: string;
    action: () => void;
    icon: string;
    tooltip: string;
  }

  let { editor, key, action, icon, tooltip }: Props = $props();

  let buttonElement: HTMLButtonElement;
  let tooltipElement: HTMLDivElement;
  let tooltipArrowElement: HTMLDivElement;

  let highlighted = $state(false);
  let disabled = $state(false);

  onMount(() => {
    editor.on("transaction", () => {
      highlighted = editor.isActive(key);
    });

    editor.on("update", () => {
      disabled = !editor.isEditable;
    });

    initializeTooltip();
  });

  function initializeTooltip() {
    computePosition(buttonElement, tooltipElement, {
      placement: "top",
      middleware: [
        offset(6),
        shift({ padding: 5 }),
        arrow({ element: tooltipArrowElement })
      ],
    }).then(({ x, y, middlewareData }) => {
      tooltipElement.style.left = `${x}px`;
      tooltipElement.style.top = `${y}px`;

      const arrowX: number = middlewareData.arrow.x;
      tooltipArrowElement.style.left = arrowX ? `${arrowX}px` : "";
      tooltipArrowElement.style.bottom = "-4px";
    });
  }
</script>

<div class="button-wrapper">
  <button bind:this={buttonElement} {disabled} class:highlighted onclick={() => action()}>
    <Icon content={icon} />
  </button>
  <div bind:this={tooltipElement} class="tooltip" role="tooltip">
    {tooltip}
    <div bind:this={tooltipArrowElement} class="arrow"></div>
  </div>
</div>

<style>
  .button-wrapper {
    position: relative;
  }

  button {
    display: flex;
    align-items: center;
    position: relative;

    margin: 6px 1px 5px 0;
    height: 28px;
    border: none;
    border-radius: 4px;
    background-color: white;

    &:hover:enabled {
      background-color: #e2e2e2;
    }

    &:hover + .tooltip {
      opacity: 1;
      transition: opacity 0.5s 0.5s;
      visibility: visible;
    }
  }

  .tooltip {
    opacity: 0;
    transition: opacity 0.5s;
    visibility: hidden;

    width: max-content;
    position: absolute;
    top: 0;
    left: 0;
    background: #222;
    color: #EEE;
    font-weight: bold;
    padding: 5px;
    border-radius: 4px;
    font-size: 90%;
  }

  .arrow {
    position: absolute;
    background: #222;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }

  button:enabled {
    cursor: pointer;
  }
  button.highlighted:enabled {
    background-color: #a6ccf7;
  }
</style>
