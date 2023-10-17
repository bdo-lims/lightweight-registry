import { writable } from "svelte/store";
import moment from "moment";
import { orderModal } from "./orders";


export let patientTemplate = writable({
    id: 0,
    name: "",
    surname: "",
    nic: "",
    request_time: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
    passport: "",
    dob: "",
    sex: "M",
    order:
    {
        labno: "",
        site: "",
        ward: "",
        program: "1400",
        requester: ""
    },
    samples: []

})

export function resetPatientTemplate() {

    patientTemplate.set({
        id: 0 ,
        name: "",
        surname: "",
        nic: "",
        request_time: moment(Date.now()).format('YYYY-MM-DDTHH:mm'),
        passport: "",
        dob: "",
        sex: "M",
        order:
        {
            labno: "",
            site: "",
            ward: "",
            program: "1400",
            requester: ""
        },
        samples: []

    })
}



export let sample = writable({ sample_type: "", labno: "", condition: "", collection_date: moment(Date.now()).format('YYYY-MM-DDTHH:mm'), collector: "", tests: "" });


export let samples = writable([]);

export let sites = writable([]);
export let wards = writable([]);
export let providers = writable([]);

export let sampleTypes = writable([]);

export let selectedSampleType = writable();
export let smallModal1 = writable(false);

export let sampleModal = writable(false);
export let conditions = writable([])
export let tests = writable([])

export function addSample() {
    let newVal
    let samples_v 
    sample.subscribe(value=>{
        newVal = value
    })
    
    samples.subscribe(value=>{
        samples_v = value
    })
    

    samples_v.push(newVal)
    
    samples.set(samples_v)
console.log(samples_v)
}  


export function resetSamples() {
    samples.set([])

}  

export function resetSample(){

    sample.set({ sample_type: "", labno: "", condition: "", collection_date: moment(Date.now()).format('YYYY-MM-DDTHH:mm'), collector: "", tests: "" })

}



