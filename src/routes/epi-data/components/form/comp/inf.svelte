<script lang="ts">

import {uiForm,sampleId,testId} from '../../store'

import {Button,Label , Input , Toggle , Select , Textarea} from 'flowbite-svelte'

    import { form ,resetForm} from './inf.js';
    import epi from 'epi-week'
    import moment from 'moment';
    import { onMount } from 'svelte';   

 let list  = [
                {name:'Positive',value:'POS'},
                {name:'Negative',value:'NEG'},
                {name:'Reject',value:'REJ'}
            ] 

let othrSamplist  = [
        {name:'TRA',value:'TRA'},
        {name:'ASP',value:'ASP'},
        {name:'BRW',value:'BRW'},
        {name:'DRY',value:'DRY'},
        {name:'BLD',value:'BLD'},
        {name:'BLV',value:'BLV'},
        {name:'CSF',value:'CSF'},
        {name:'PLF',value:'PLF'}
        ] 

$: $form.epiWk = epi(new Date(moment($form.dateReq).format('YYYY-MM-DD') )).week


let resultList

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
    $form.symptoms = JSON.parse(epiDataRes.symptoms)
    $form.vaccinated = epiDataRes.vaccinated
    $form.result = epiDataRes.results_value    
    $form.results = JSON.parse(epiDataRes.results)    
    $form.test_id = $testId
    $form.sample_id = $sampleId
    $form.order_id = epiDataRes.order_id
    $form.exist = epiDataRes.exist
    $form.amies  = epiDataRes.amies
    $form.hadj_pilgrim = epiDataRes.hadj_pilgrim
    $form.ili = epiDataRes.ili
    $form.iso = epiDataRes.iso
    $form.vaccinated_date = epiDataRes.date_vacc
    $form.unlabelled = epiDataRes.unlabelled
    $form.travel_history = epiDataRes.travel_history
    $form.sputum = epiDataRes.sputum
    $form.spilt = epiDataRes.spilt
    $form.sf = epiDataRes.sf
    $form.sentinnel = epiDataRes.sentinnel
    $form.sari = epiDataRes.sari
    $form.sample = epiDataRes.e_sample
    $form.process = epiDataRes.process
    $form.p = epiDataRes.p
    $form.other_symptoms = epiDataRes.other_symptoms
    $form.other_samp = epiDataRes.other_samp
    $form.medical_conditions = epiDataRes.medical_conditions
    // $form.age_group = epiDataRes.age_group
    $form.vtm = epiDataRes.vtm
    

}

}


onMount(async()=>{
  let fetchResults = await fetch('/api/influenza')
   resultList = await fetchResults.json()
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

let req = await fetch('/api/epi/inf' , options)

}




</script>
    
<div class="mt-5 mb-20 inline-block min-w-full shadow-lg  border-2 rounded-lg p-6">

    <div class="inline-block w-1/3 align-top">

        <div >
            <Input type='number' id='id' class="w-1/4" bind:value={$form.id} disabled/>
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

        

        <div class="mt-2">

            <div class=" inline-block  lg:mx-2">
                <Label for='p' class='block mb-2'>P</Label>
                <Toggle id="p" bind:checked={$form.p}></Toggle>
            </div>
            <div class=" inline-block lg:mx-2">
                <Label for='sf' class='block mb-2 '>SF</Label>
                <Toggle id="sf" bind:checked={$form.sf}></Toggle>
                <!-- <Input id='surname' class="w-40" value={$form.ward}/> -->
            </div>
            <div class=" inline-block  lg:mx-2">
                <Label for='sentinnel' class='block mb-2'>Sentinnel</Label>
                <Toggle id="sentinnel" bind:checked={$form.sentinnel}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='iso' class='block mb-2'>ISO</Label>
                <Toggle id="iso" bind:checked={$form.iso}></Toggle>
            </div>
        </div>



        <div class="border-b-4 w-2/3 m-4"></div>


        <div>
            <div class="mb-2 mr-2 inline-block">
                <Label for='sex' class='block mb-2'>Sex</Label>
                <Input id='sex' class="w-20" bind:value={$form.sex}/>
         
            </div>
            <div class="mb-2 mr-2 inline-block">
                <Label for='age' class='block mb-2'>Age</Label>
                <Input id='age' class="w-20" bind:value={$form.age}/>
         
            </div>
            <div class="mb-2 inline-block">
                <Label for='age_group' class='block mb-2'>Age Group</Label>
                <Input id='age_group' class="w-20" bind:value={$form.age_group}/>
         
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

        <div class="border-b-4 w-2/3 m-4"></div>

        

        <div class="mt-2">

            <div class=" inline-block  lg:mx-2">
                <Label for='ili' class='block mb-2'>ILI</Label>
                <Toggle id="ili" bind:checked={$form.ili}></Toggle>
            </div>
            <div class=" inline-block lg:mx-2">
                <Label for='sari' class='block mb-2 '>SARI</Label>
                <Toggle id="sari" bind:checked={$form.sari}></Toggle>
                <!-- <Input id='surname' class="w-40" value={$form.ward}/> -->
            </div>
            <div class=" inline-block  lg:mx-2">
                <Label for='vtm' class='block mb-2'>VTM</Label>
                <Toggle id="vtm" bind:checked={$form.vtm}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='amies' class='block mb-2'>Amies</Label>
                <Toggle id="amies" bind:checked={$form.amies}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='sputum' class='block mb-2'>Sputum</Label>
                <Toggle id="sputum" bind:checked={$form.sputum}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='hadj_pilgrim' class='block mb-2'>HADJ PILGRIM</Label>
                <Toggle id="hadj_pilgrim" bind:checked={$form.hadj_pilgrim}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='spilt' class='block mb-2'>SPILT</Label>
                <Toggle id="spilt" bind:checked={$form.spilt}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='unlabelled' class='block mb-2'>UNLABELLED</Label>
                <Toggle id="unlabelled" bind:checked={$form.unlabelled}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='process' class='block mb-2'>PROCESS</Label>
                <Toggle id="process" bind:checked={$form.process}></Toggle>
            </div>
            
            <div class=" inline-block  lg:mx-2">
                <Label for='sample' class='block mb-2'>SAMPLE</Label>
                <Toggle id="sample" bind:checked={$form.sample}></Toggle>
            </div>
    
            <div class="mt-6 ">
                <Label for='other_samp' class='block mb-2'>Other Sample Type</Label>
                <Select class='w-400' id="ns1_IgG" items={othrSamplist} bind:value={$form.other_samp}/>
            </div>

        </div>




        <div class="border-b-4 w-2/3 m-4 lg:hidden"></div>
    </div>
    

    <div class="lg:inline-block w-3/4 lg:w-2/4 align-top lg:ml-10">
        <!-- results pane  -->

                <div class="mt-2">
                    <fieldset class="inline-block border-2 border-slate-400  rounded-lg p-2 shadow-md"><legend class="text-sm font-black">SYMPTOMS / CLINICAL DIAGNOSIS</legend>
                        <div class=" inline-block  lg:mx-2">
                            <Label for='urti' class='block mb-2'>URTI</Label>
                            <Toggle id="urti" bind:checked={$form.symptoms.urti}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='cough' class='block mb-2'>COUGH</Label>
                            <Toggle id="cough" bind:checked={$form.symptoms.cough}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='fever' class='block mb-2'>FEVER</Label>
                            <Toggle id="fever" bind:checked={$form.symptoms.fever}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='puo' class='block mb-2'>PUO</Label>
                            <Toggle id="puo" bind:checked={$form.symptoms.puo}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='sore_throat' class='block mb-2'>SORE THROAT</Label>
                            <Toggle id="sore_throat" bind:checked={$form.symptoms.sore_throat}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='bronchitis' class='block mb-2'>BRONCHITIS</Label>
                            <Toggle id="bronchitis" bind:checked={$form.symptoms.bronchitis}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='chist_infection' class='block mb-2'>CHEST INFECTION</Label>
                            <Toggle id="chist_infection" bind:checked={$form.symptoms.chist_infection}></Toggle>
                        </div>
                        
                        <div class=" inline-block  lg:mx-2">
                            <Label for='pneumonia' class='block mb-2'>PNEUMONIA</Label>
                            <Toggle id="pneumonia" bind:checked={$form.symptoms.pneumonia}></Toggle>
                        </div>
                
                        
                
                        <div class="my-2 ">
                            <Label for='other_symptoms' class='block mb-2'>OTHER SYMPTOMS</Label>
                            <Input id='other_symptoms' class="w-80" bind:value={$form.other_symptoms}/>
                        </div>
                        <div class="my-2 ">
                            <Label for='medical_conditions' class='block mb-2'>MEDICAL CONDITIONS</Label>
                            <Input id='medical_conditions' class="w-80" bind:value={$form.medical_conditions}/>
                        </div>
                        <div class="my-2 ">
                            <Label for='travel_history' class='block mb-2'>TRAVEL HISTORY</Label>
                            <Input id='travel_history' class="w-80" bind:value={$form.travel_history}/>
                        </div>

                        <div>
                            
                        <div class=" my-2">
                            <Label for='vaccinated' class='block mb-2'>VACCINTED</Label>
                            <Toggle id="vaccinated" bind:checked={$form.vaccinated}></Toggle>
                        </div>
                            
                        <div class="inline-block my-2">
                            <Label for='vaccinated_date' class='block mb-2'>DATE VACCINATED</Label>
                            <Input id='vaccinated_date' type='date' class="w-26" bind:value={$form.vaccinated_date}/>
                        </div>

                        </div>

                    </fieldset>

                    
                <div class="border-b-4 w-2/3 m-4 "></div>
                
                <fieldset class="inline-block border-2 border-slate-400  rounded-lg p-2 shadow-md"><legend class="text-sm font-black">RESULTS</legend>
                    <div class=" inline-block  lg:mx-2">
                        <div class=" inline-block  lg:mx-2">
                            <Label for='inf_a' class='block mb-2'>INF A</Label>
                            <Toggle id="inf_a" bind:checked={$form.results.inf_a}></Toggle>
                        </div>

                        <div class=" inline-block  lg:mx-2">
                            <Label for='sars_2cov' class='block mb-2'>SARS-2Cov (COV)</Label>
                            <Toggle id="sars_2cov" bind:checked={$form.results.sars_2cov}></Toggle>
                        </div>

                        <div class=" inline-block  lg:mx-2">
                            <Label for='ah3' class='block mb-2'>AH3</Label>
                            <Toggle id="ah3" bind:checked={$form.results.ah3}></Toggle>
                        </div>

                        <div class=" inline-block  lg:mx-2">
                            <Label for='b_yamagata' class='block mb-2'>B YAMAGATA</Label>
                            <Toggle id="b_yamagata" bind:checked={$form.results.b_yamagata}></Toggle>
                        </div>

                        <div class=" inline-block  lg:mx-2">
                            <Label for='rsv' class='block mb-2'>RSV</Label>
                            <Toggle id="rsv" bind:checked={$form.results.rsv}></Toggle>
                        </div>

                        <div class=" inline-block  lg:mx-2">
                            <Label for='ah5' class='block mb-2'>AH5</Label>
                            <Toggle id="ah5" bind:checked={$form.results.ah5}></Toggle>
                        </div>

                        <div class=" inline-block  lg:mx-2">
                            <Label for='ah9' class='block mb-2'>AH9</Label>
                            <Toggle id="ah9" bind:checked={$form.results.ah9}></Toggle>
                        </div>
    
                    </div>

                    <div class="border-b-4 w-2/3 m-4 "></div>

                     <div class=" inline-block  lg:mx-2">

                        
                    <div class=" inline-block  lg:mx-2">
                        <Label for='inf_b' class='block mb-2'>INF B</Label>
                        <Toggle id="inf_b" bind:checked={$form.results.inf_b}></Toggle>
                    </div>
                    <div class=" inline-block  lg:mx-2">
                        <Label for='mers_cov' class='block mb-2'>MERSCoV (NOC)</Label>
                        <Toggle id="mers_cov" bind:checked={$form.results.mers_cov}></Toggle>
                    </div>
                    <div class=" inline-block  lg:mx-2">
                        <Label for='pdma' class='block mb-2'>pdma</Label>
                        <Toggle id="pdma" bind:checked={$form.results.pdma}></Toggle>
                    </div>
                    <div class=" inline-block  lg:mx-2">
                        <Label for='b_victoria' class='block mb-2'>B VICTORIA</Label>
                        <Toggle id="b_victoria" bind:checked={$form.results.b_victoria}></Toggle>
                    </div>
                    <div class=" inline-block  lg:mx-2">
                        <Label for='adeno' class='block mb-2'>ADENO</Label>
                        <Toggle id="adeno" bind:checked={$form.results.adeno}></Toggle>
                    </div>
                    <div class=" inline-block  lg:mx-2">
                        <Label for='ah7' class='block mb-2'>AH7</Label>
                        <Toggle id="ah7" bind:checked={$form.results.ah7}></Toggle>
                    </div>
                    
                     </div>
                    

                    <div class=" inline-block  lg:mx-5">
                        <Label for='result_pcr' class='block mb-2'>RESULTS</Label>
                        <Select id="result_pcr" items={resultList} bind:value={$form.result}/>
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
