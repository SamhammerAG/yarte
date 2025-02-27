import type { ActionReturn } from "svelte/action";

export function clickOutside(node: HTMLDivElement): ActionReturn<HTMLElement, { 'onoutclick': (e: CustomEvent) => void }> {
  const handleClick = (event: Event) => {
    if (!node.contains(event.composedPath()[0] as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };
  window.addEventListener('mousedown', handleClick, true);

  return {
    destroy: () => {
      window.removeEventListener('mousedown', handleClick, true);
    }
  };
}
