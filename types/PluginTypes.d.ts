import type { Component } from "svelte"

export type PluginToolbarButton = {
    component: Component<any>,
    properties?: any
}

export type PluginBubbleMenu = {
    component: Component<any>,
    element?: HTMLElement
}