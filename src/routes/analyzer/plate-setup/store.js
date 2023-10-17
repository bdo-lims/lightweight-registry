import { writable } from "svelte/store";
export const orderMap = writable({})
export function resetOrderMap(){
    orderMap.update(n=> n = {} )
}
export const selectedField = writable({id:'' , location:'' ,barcode:'' , iterator:0 , column:7})