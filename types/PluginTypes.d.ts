/* eslint-disable @typescript-eslint/no-explicit-any */
// ToDo: Try to remove any types.
import type { Component } from "svelte"

export type PluginToolbarButton = {
    component: Component<any>,
    properties?: any
}

export type PluginBubbleMenu = {
    component: Component<any>,
    element?: HTMLElement
}
