import type { Subaction } from "./SubAction";

export type Action = {
  subactions?: Subaction[]
} & Subaction;
