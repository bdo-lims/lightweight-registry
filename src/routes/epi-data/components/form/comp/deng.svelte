<script lang="ts">

import {uiForm ,sampleId,testId} from '../../store'

import {Button, Label , Input , Toggle , Select , Textarea} from 'flowbite-svelte'
    import { form ,resetForm} from './dengue.js';
    import epi from 'epi-week'
    import moment from 'moment';
import { onMount } from 'svelte';

 let list  = [
                {name:'Positive',value:'POS'},
                {name:'Negative',value:'NEG'},
                {name:'Reject',value:'REJ'}
            ] 

$: $form.epiWk = epi(new Date(moment($form.dateReq).format('YYYY-MM-DD') )).week


async function fetchEpiData() {
    
    let fetchEpidata = await fetch(`/api/epi_form?samp=${$sampleId}&test=${$testId}`)
    let epiDataRes = await fetchEpidata.json();
    epiDataRes = epiDataRes[0]
    if(!epiDataRes.exist){

        $form.name = epiDataRes.names
        $form.surname = epiDataRes.surname
        $form.dateReq = epiDataRes.request_time
        $form.sex = epiDataRes.sex
        $form.hospital = epiDataRes.site
        $form.ward = epiDataRes.ward
        $form.age = epiDataRes.p_age
        $form.test_id = $testId
        $form.sample_id = $sampleId
        $form.order_id = epiDataRes.order_id
        $form.exist = epiDataRes.exist


    }
    else{
    $form.id = epiDataRes.epi_id
    $form.name = epiDataRes.names
    $form.surname = epiDataRes.surname
    $form.dateReq = epiDataRes.request_time
    $form.sex = epiDataRes.sex
    $form.hospital = epiDataRes.site
    $form.ward = epiDataRes.ward
    $form.age = epiDataRes.p_age
    $form.result_pcr = epiDataRes.results_value    
    $form.results = JSON.parse(epiDataRes.results)    
    $form.test_id = $testId
    $form.sample_id = $sampleId
    $form.order_id = epiDataRes.order_id
    $form.exist = epiDataRes.exist
    $form.blood = epiDataRes.blood
    $form.dbs = epiDataRes.dbs
    $form.travel = epiDataRes.travel
    }

}





async function postBatch (){

let method = $form.exist == true ? 'PUT' : 'POST'
let options = {
body: JSON.stringify($form) ,headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method
};

let req = await fetch('/api/epi/deng' , options)

}


let resultList = 
onMount(async()=>{
  let fetchResults = await fetch('/api/dengue')
   resultList = await fetchResults.json()

   
await fetchEpiData()
    
} )


</script>
    
<div class="mt-5 mb-20 inline-block min-w-full shadow-lg  border-2 rounded-lg p-6">

    <div class="inline-block w-1/3 align-top">

        <div >
            <Input type='number' id='id' class="w-14" bind:value={$form.id} disabled/>
        </div>
          
        
        <div>

            <div class="mb-2  inline-block mr-2 ">
                <Label for='epiWk' class='block my-2'>Epi-Week</Label>
                <Input type='number' id='epiWk' class="w-16" bind:value={$form.epiWk}/>
            </div>
            <div class="inline-block">
                <Label for='dateReq' class='block mb-2'>Requested Date</Label>
                <Input id='dateReq' type='date' class="w-26" bind:value={$form.dateReq}/>
            </div>

        </div>

        <div class="border-b-4 w-2/3 m-4"></div>

        <div>
            <div class="mb-2 mr-2 inline-block">
                <Label for='sex' class='block mb-2'>Sex</Label>
                <Input id='sex' class="w-20" bind:value={$form.sex}/>
         
            </div>
            <div class="mb-2 inline-block">
                <Label for='age' class='block mb-2'>Age</Label>
                <Input id='age' class="w-20" bind:value={$form.age}/>
         
            </div>

        </div>
        <div class="">

            <div class="mb-6 inline-block">
                <Label for='surname' class='block mb-2'>Surname</Label>
                <Input id='surname' class="w-40" bind:value={$form.surname}/>
            </div>
    
            <div class="mb-6 inline-block">
                <Label for='name' class='block mb-2'>First Names</Label>
                <Input id='name' class="w-80" bind:value={$form.name}/>
            </div>
        </div>
        

        <div class="border-b-4 w-2/3 m-4"></div>


        <div class="mt-2">

            <div class="mb-6 inline-block">
                <Label for='surname' class='block mb-2'>Hospital</Label>
                <Input id='surname' class="w-40" bind:value={$form.hospital}/>
            </div>
            <div class="mb-6 inline-block">
                <Label for='surname' class='block mb-2'>Ward</Label>
                <Input id='surname' class="w-40" bind:value={$form.ward}/>
            </div>
            <div class="mb-6 inline-block">
                <Label for='surname' class='block mb-2'>Card Number</Label>
                <Input id='surname' class="w-40" bind:value={$form.card}/>
            </div>
        </div>

        <div class="mt-2">

            <div class="mb-6 inline-block  lg:mx-5">
                <Label for='blood' class='block mb-2'>Blood</Label>
                <Toggle id="blood" bind:checked={$form.blood}>No / Yes</Toggle>
            </div>
            <div class="mb-6 inline-block lg:mx-5">
                <Label for='dbs' class='block mb-2 '>DBS</Label>
                <Toggle id="dbs" bind:checked={$form.dbs}>No / Yes</Toggle>
                <!-- <Input id='surname' class="w-40" value={$form.ward}/> -->
            </div>
            <div class="mb-6 inline-block  lg:mx-5">
                <Label for='travel' class='block mb-2'>Travel</Label>
                <Toggle id="travel" bind:checked={$form.travel}>No / Yes</Toggle>
            </div>
        </div>
        <div class="border-b-4 w-2/3 m-4 lg:hidden"></div>
    </div>
    

    <div class="lg:inline-block w-3/4 lg:w-2/4 align-top lg:ml-10 ">
        <!-- results pane  -->

                <div class="mt-2">
                    <fieldset class="inline-block border-2 border-slate-400  rounded-lg p-2 shadow-md "><legend class="text-sm font-black">RESULTS</legend>
                        <div class="mb-6 inline-block  lg:mx-5">
                            <Label for='den' class='block mb-2'>PCR DENGUE</Label>
                            <Select id="den" items={list} bind:value={$form.results.den}/>
                        </div>
                        <div class="mb-6 inline-block lg:mx-5">
                            <Label for='den1' class='block mb-2 '>DENGUE TYPE 1</Label>
                            <Select id="den1" items={list} bind:value={$form.results.den1}/>
                            <!-- <Input id='surname' class="w-40" value={$form.ward}/> -->
                        </div>
                        <div class="mb-6 inline-block  lg:mx-5">
                            <Label for='chik' class='block mb-2'>CHIKUNGUNYA</Label>
                            <Select id="chik" items={list} bind:value={$form.results.chik}/>
                        </div>
                        
                <div class="border-b-4 w-2/3 m-4 "></div>
                
                <div class="mb-6 inline-block  lg:mx-5">
                    <Label for='ns1_ag' class='block mb-2'>RAPID NS1 Ag</Label>
                    <Select id="ns1_ag" items={list} bind:value={$form.results.ns1_ag}/>
                </div>
                <div class="mb-6 inline-block lg:mx-5">
                    <Label for='ns1_IgM' class='block mb-2 '>IgM</Label>
                    <Select id="ns1_IgM" items={list} bind:value={$form.results.ns1_IgM}/>
                    <!-- <Input id='surname' class="w-40" value={$form.ward}/> -->
                </div>
                <div class="mb-6 inline-block  lg:mx-5">
                    <Label for='ns1_IgG' class='block mb-2'>IgG</Label>
                    <Select id="ns1_IgG" items={list} bind:value={$form.results.ns1_IgG}/>
                </div>
                

            <div class="border-b-4 w-2/3 m-4 "></div>

            <div class=" inline-block  lg:mx-5">
                <Label for='result_pcr' class='block mb-2'>RESULT PCR</Label>
                <Select id="result_pcr" items={resultList} bind:value={$form.result_pcr}/>
            </div>
            

            
            <div class=" inline-block  lg:mx-5 mb-10">
                <Label for='eia_ns1' class='block mb-2'>EIA NS1</Label>
                <Select id="eia_ns1" items={list} bind:value={$form.results.eia_ns1}/>
            </div>
                    </fieldset>

                    
                
                </div>

        <!-- results pane  -->

    </div>

    <div class="border-b-4 w-2/3 m-4 "></div>
    <div class="w-1/2">
        <Textarea label='Comments'   ></Textarea>
    </div>


    

<div class="mt-8 gap-12 flex  flex-wrap items-center justify-end p-4 border-t border-gray-300 rounded-b-md">
    <div>
        <Button outline on:click={()=>{  $uiForm = 0 ; resetForm()} } >Cancel</Button>
        <Button  on:click={postBatch } >Save</Button>
    </div>

    <div>

    </div>
</div>
    
</div>
