import {  writable } from "svelte/store";




export let user = writable({name:'marc'});
export let sampModal = writable(false);
export let sampTypeModal = writable(false);

export let step = writable(1);

export let refr = writable(1);


export let orderModal = writable(false);


export let sampleType = writable({"id":"32","description":"Fluid"});

export let labnumber = writable("");


export let sampleTypes = writable([]);
export let conditions = writable([]);

export let orders = writable([]);

export async function getOrder(){
    let getData = await fetch('/registry/__data.json')
    let data = await getData.json()
    orders.set(data.order)
}
