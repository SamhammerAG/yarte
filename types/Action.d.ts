import type { SvelteComponent } from "svelte";
import type { Subaction } from "./SubAction";

export type Action = {
  key: string,
  component: HTMLComponent,
  extensions: (context?: ActionsContext) => (Node<any> | Mark<any> | Extension<any>)[];
};
