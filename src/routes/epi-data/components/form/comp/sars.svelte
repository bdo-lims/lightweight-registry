<script lang="ts">
import {uiForm , sampleId , testId } from '../../store'

import {Button,Label , Input , Toggle , Select , Textarea} from 'flowbite-svelte'
    import { form ,resetForm} from './sars.js';
    import epi from 'epi-week'
    import moment from 'moment';
import { onMount } from 'svelte';

 let list  = [
                {name:'Positive',value:'POS'},
                {name:'Negative',value:'NEG'},
                {name:'Reject',value:'REJ'}
            ] 

 let VacSymlist  = [
                {name:'YES',value:'YES'},
                {name:'NO',value:'NO'},
                {name:'NOT STATED',value:'NOT STATED'}
            ] 
 let RapTestLis  = [
                {name:'POSITIVE',value:'POS'},
                {name:'NEGATIVE',value:'NEG'},
                {name:'NOT STATED',value:'NOT STATED'}
            ] 
 let CaseList  = [
                {name:'LOCAL NEW',value:'LOCAL NEW'},
                {name:'KC',value:'KC'},
                {name:'IMPORTED',value:'IMPORTED'},
                {name:'OTHER',value:'OTHER'}
            ] 

$: $form.epiWk = epi(new Date(moment($form.dateReq).format('YYYY-MM-DD') )).week

let resultList  = [
                {name:'DETECTED',value:'DETECTED'},
                {name:'NOT DETECTED',value:'NOT DETECTED'},
                {name:'REPEAT 48H',value:'REPEAT 48H'},
                {name:'IC FAIL',value:'IC FAIL'},
                {name:'ULS',value:'ULS'},
                {name:'SPILT',value:'SPILT'},
                {name:'REPEAT LAB LEVEL',value:'REPEAT LAB LEVEL'},
                {name:'MISLABELLED',value:'MISLABELLED'},
                {name:'NO SWAB IN VTM',value:'NO SWAB IN VTM'},
                {name:'NO SAMPLE RECEIVED',value:'NO SAMPLE RECEIVED'}
            ]
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
    $form.rapid_test = epiDataRes.rapid_test
    $form.symptoms = epiDataRes.symptoms
    $form.vaccinated = epiDataRes.vaccinated
    $form.dose = epiDataRes.dose
    $form.vaccine_type = epiDataRes.vaccine_type
    $form.pcr = epiDataRes.pcr
    $form.case = epiDataRes.case
    $form.n_gene = epiDataRes.n_gene
    $form.e_gene = epiDataRes.e_gene
    $form.result_pcr = epiDataRes.results_value    
    $form.results = JSON.parse(epiDataRes.results)    
        $form.test_id = $testId
        $form.sample_id = $sampleId
        $form.order_id = epiDataRes.order_id
        $form.exist = epiDataRes.exist
    }

}


onMount(async()=>{
await fetchEpiData()
} )






async function postBatch (){

      let method = $form.exist == true ? 'PUT' : 'POST'
let options = {
body: JSON.stringify($form) ,headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method
};

let req = await fetch('/api/epi/sars' , options)

}

</script>
    
<div class="mt-5 mb-20 inline-block min-w-full shadow-lg  border-2 rounded-lg p-6">

    <div class="inline-block w-1/3 align-top">

        <div >
            <Input type='number' id='id' class="w-1/4 " bind:value={$form.id} disabled />
        </div>
          
        
        <div>

            <div class="mb-2  inline-block mr-2 ">
                <Label for='epiWk' class='block my-2 '>Epi-Week</Label>
                <Input  type='number' id='epiWk' class="w-16 " bind:value={$form.epiWk}/>
            </div>
            <div class="inline-block">
                <Label for='dateReq' class='block mb-2 '>Requested Date</Label>
                <Input  id='dateReq' type='date' class="w-26 " bind:value={$form.dateReq}/>
            </div>

        </div>

        <div class="border-b-4 w-2/3 m-4"></div>

        <div>
            <div class="mb-2 mr-2 inline-block">
                <Label for='sex' class='block mb-2 '>Sex</Label>
                <Input  id='sex' class="w-20 " bind:value={$form.sex}/>
         
            </div>
            <div class="mb-2 inline-block">
                <Label for='age' class='block mb-2 '>Age</Label>
                <Input  id='age' class="w-200 " bind:value={$form.age}/>
         
            </div>

        </div>
        <div class="">

            <div class="mb-6 inline-block">
                <Label for='surname' class='block mb-2 '>Surname</Label>
                <Input  id='surname' class="w-40 " bind:value={$form.surname}/>
            </div>
    
            <div class="mb-6 inline-block">
                <Label for='name' class='block mb-2 '>First Names</Label>
                <Input  id='name' class="w-80 " bind:value={$form.name}/>
            </div>
        </div>
        

        <div class="border-b-4 w-2/3 m-4"></div>


        <div class="mt-2">

            <div class="mb-6 inline-block">
                <Label for='hospital' class='block mb-2'>Hospital</Label>
                <Input id='hospital' class="w-40" bind:value={$form.hospital}/>
            </div>
            <div class="mb-6 inline-block">
                <Label for='ward' class='block mb-2'>Ward</Label>
                <Input id='ward' class="w-40" bind:value={$form.ward}/>
            </div>
            <div class="mb-6 inline-block">
                <Label for='card' class='block mb-2'>Card Number</Label>
                <Input id='card' class="w-40" bind:value={$form.card}/>
            </div>
        </div>

        <div class="mt-2">

            <div class="mb-6 inline-block ">
                <Label for='rapid_test' class='block mb-2'>RAPID TEST</Label>
                <Select id="rapid_test" items={RapTestLis} bind:value={$form.rapid_test}/>
            </div>
            <div class="mb-6 inline-block lg:mx-5">
                <Label for='symptoms' class='block mb-2 '>SYMPTOMS</Label>
                <Select id="symptoms" items={VacSymlist} bind:value={$form.symptoms}/>
            </div>
            <div class="mb-6 inline-block ">
                <Label for='vaccinated' class='block mb-2'>VACCINATED</Label>
                <Toggle id="vaccinated"  bind:checked={$form.vaccinated}/>
            </div>
            <div></div>
            <div class="mb-6 inline-block ">
                <Label for='dose' class='block mb-2'>Dose</Label>
                <Input type='number' id='dose' class="w-14" bind:value={$form.dose}/>
            </div>
    
            <div class="mb-6 inline-block">
                <Label for='vaccine_type' class='block mb-2'>Vaccine Type</Label>
                <Input id='vaccine_type' class="w-80" bind:value={$form.vaccine_type}/>
            </div>

        </div>
        
        <div class="border-b-4 w-2/3 m-4 "></div>

        <div class=" inline-block mb-6">
            <Label for='result_pcr' class='block mb-2'>PCR</Label>
            <Select id="result_pcr" items={resultList} bind:value={$form.result_pcr}/>
        </div>
        <div>
            
            <div class="mb-6  ">
                <Label for='case' class='block mb-2'>CASE</Label>
                <Select id="case" items={CaseList} bind:value={$form.case}/>
            </div>
            
            <div class="mb-6 inline-block  lg:mx-5">
                <Label for='n_gene' class='block mb-2'>N-GENE</Label>
                <Toggle id="n_gene" bind:checked={$form.n_gene}></Toggle>
            </div>
            
            <div class="mb-6 inline-block  lg:mx-5">
                <Label for='e_gene' class='block mb-2'>E-GENE</Label>
                <Toggle id="e_gene" bind:checked={$form.e_gene}></Toggle>
            </div>

        </div>

        <div class="border-b-4 w-2/3 m-4 lg:hidden"></div>
    </div>
    

    <div class="lg:inline-block w-3/4 lg:w-2/4 align-top lg:ml-10">
        <!-- results pane  -->

                <div class="mt-2">
                    <fieldset class="inline-block border-2 border-slate-400  rounded-lg p-2 shadow-md"><legend class="text-sm  font-black ">RESULTS</legend>
                        
                        <div class=" lg:mx-5">
                            <Label for='date_tested' class='block mb-2'>Date Tested</Label>
                            <Input id='date_tested' type='date' class="md:w-1/3" bind:value={$form.results.date_tested}/>
                        </div>
                        
                        <div class="mb-2  inline-block lg:mx-5 ">
                            <Label for='delY144_al_1' class='block my-2'>delY144 AL 1</Label>
                            <Toggle  id='delY144_al_1' class="w-16" bind:checked={$form.results.delY144_al_1}/>
                        </div>

                        
                        <div class="mb-2  inline-block lg:mx-5 ">
                            <Label for='q498r' class='block my-2'>Q498R</Label>
                            <Toggle  id='q498r' class="w-16" bind:checked={$form.results.q498r}/>
                        </div>


                        <div class="mb-2  inline-block lg:mx-5 ">
                            <Label for='s_gene' class='block my-2'>S-GENE</Label>
                            <Toggle  id='s_gene' class="w-16" bind:checked={$form.results.s_gene}/>
                        </div>

                        <div class="mb-6  lg:mx-5">
                            <Label for='variant' class='block mb-2'>VARIANT</Label>
                            <Input id='variant' class="w-2/3" bind:value={$form.results.variant}/>
                         </div>

                         
                        <div class="mb-2  inline-block lg:mx-5 ">
                            <Label for='p681r' class='block my-2'>P681R</Label>
                            <Toggle id='p681r' class="w-16" bind:checked={$form.results.p681r}/>
                        </div>

                        
                        <div class="mb-2  inline-block lg:mx-5 ">
                            <Label for='d215g' class='block my-2'>D215G</Label>
                            <Toggle id='d215g' class="w-16" bind:checked={$form.results.d215g}/>
                        </div>


                        <div class="mb-2  inline-block lg:mx-5">
                            <Label for='d614g' class='block my-2'>D614G</Label>
                            <Toggle id='d614g' class="w-16" bind:checked={$form.results.d614g}/>
                        </div>

                        
                        <div class="mb-2  inline-block lg:mx-5 ">
                            <Label for='k417n' class='block my-2'>K417N</Label>
                            <Toggle id='k417n' class="w-16" bind:checked={$form.results.k417n}/>
                        </div>

                        <div>
                        
                            <div class="mb-6 md:inline-block lg:mx-5">
                                <Label for='ngs' class='block mb-2'>NGS</Label>
                                <Input id='ngs'  bind:value={$form.results.ngs}/>
                             </div>
    
                             
                            <div class="mb-6 md:inline-block lg:mx-5">
                                <Label for='crick' class='block mb-2'>CRICK</Label>
                                <Input id='crick'  bind:value={$form.results.crick}/>
                             </div>
    
                             
                            <div class="mb-6 md:inline-block lg:mx-5">
                                <Label for='nicd' class='block mb-2'>NICD</Label>
                                <Input id='nicd'  bind:value={$form.results.nicd}/>
                             </div>

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
