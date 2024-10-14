import type { ActionReturn } from "svelte/action";
export function clickOutside(node: HTMLDivElement): ActionReturn<HTMLElement, { 'on:outclick': (e: CustomEvent<string>) => void }> {

  const handleClick = (event: Event) => {
    if (!node.contains(event.composedPath()[0] as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('mousedown', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('mousedown', handleClick, true);
    }
  };
}