import { writable } from "svelte/store";


export let msg  = writable('Saved!')


export let visible = writable(false)

