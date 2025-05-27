<script lang="ts">
  import type { Editor } from "@tiptap/core";
  import Icon from "./Icon.svelte";
  import { onDestroy, onMount } from "svelte";
  import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";

  interface Props {
    editor: Editor;
    key: string;
    action: () => void;
    icon: string;
    tooltip: string;
  }

  let { editor, key, action, icon, tooltip }: Props = $props();

  let timeoutId: number;
  let buttonElement: HTMLButtonElement;
  let tooltipElement: HTMLDivElement;
  let tooltipArrowElement: HTMLDivElement;

  let highlighted = $state(false);
  let disabled = $state(false);

  onMount(() => {
    (
      [
        ["mouseenter", showTooltip],
        ["mouseleave", hideTooltip],
        ["blur", hideTooltip],
      ] as [string, EventListenerOrEventListenerObject][]
    ).forEach(([event, listener]) => {
      buttonElement.addEventListener(event, listener);
    });

    editor.on("transaction", () => {
      highlighted = editor.isActive(key);
    });

    editor.on("update", () => {
      disabled = !editor.isEditable;
    });
  });

  onDestroy(() => {
    (
      [
        ["mouseenter", showTooltip],
        ["mouseleave", hideTooltip],
        ["blur", hideTooltip],
      ] as [string, EventListenerOrEventListenerObject][]
    ).forEach(([event, listener]) => {
      buttonElement.removeEventListener(event, listener);
    });
  });

  function update() {
    computePosition(buttonElement, tooltipElement, {
      placement: "top",
      middleware: [offset(6), flip(), shift({ padding: 5 }), arrow({ element: tooltipArrowElement })],
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltipElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      Object.assign(tooltipArrowElement.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        right: "",
        bottom: "",
        [staticSide]: "-4px",
      });
    });
  }

  function showTooltip() {
    timeoutId = setTimeout(() => {
      tooltipElement.style.display = "block";
      update();
    }, 800);
  }

  function hideTooltip() {
    clearTimeout(timeoutId);
    tooltipElement.style.display = "";
  }
</script>

<button bind:this={buttonElement} {disabled} class:highlighted onclick={() => action()}>
  <Icon content={icon} />
</button>
<div bind:this={tooltipElement} id="tooltip" role="tooltip">
  {tooltip}
  <div bind:this={tooltipArrowElement} id="arrow"></div>
</div>

<style>
  button {
    display: flex;
    align-items: center;

    margin: 6px 1px 5px 0;
    height: 28px;
    border: none;
    border-radius: 4px;
    background-color: white;

    &:hover:enabled {
      background-color: #e2e2e2;
    }
  }

  #tooltip {
    display: none;
    width: max-content;
    position: absolute;
    top: 0;
    left: 0;
    background: #222;
    color: white;
    font-weight: bold;
    padding: 5px;
    border-radius: 4px;
    font-size: 90%;
  }

  #arrow {
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
