import type { ActionReturn } from "svelte/action";
export function clickOutside(node: HTMLDivElement): ActionReturn<HTMLElement, { 'on:outclick': (e: CustomEvent<string>) => void }> {

  const handleClick = (event: Event) => {
    if (!node.contains(event.target as Node)) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  };
}