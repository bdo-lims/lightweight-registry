import { writable } from "svelte/store";


export let sampCount = writable([])
export let total_orders = writable(0)
export let pending_orders = writable(0)
export let orders_in_progress = writable(0)
