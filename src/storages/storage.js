import { writable } from "svelte/store"
import { browser } from "$app/environment"

export const sfloor = writable(browser && localStorage.getItem("sfloor") || "f1")

export const sasset = writable(browser && localStorage.getItem("sasset") || "null")

export const isToolsOpen = writable(browser && localStorage.getItem("isToolsOpen") || "true")

export const scale = writable(browser && localStorage.getItem("scale") || "1")

sfloor.subscribe((__floor) => {
  if (browser) return (localStorage.sfloor = __floor)
})

sasset.subscribe((__asset) => {
  if (browser) return (localStorage.sasset = __asset)
})

isToolsOpen.subscribe((__bool) => {
  if (browser) return (localStorage.isToolsOpen = __bool)
})

scale.subscribe((__number) => {
  if (browser) return (localStorage.scale = __number)
})