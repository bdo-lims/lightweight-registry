import { writable } from "svelte/store"

export let uiForm = writable(0)
export let sampleId = writable(0)
export let testId = writable(0)
export let dashData = writable([])