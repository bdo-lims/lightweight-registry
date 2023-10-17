<script>
import { sample,patientTemplate ,selectedSampleType , sampleModal ,resetSample ,conditions ,tests } from "$lib/stores/newOrder";
import { Button, Input ,Label} from "flowbite-svelte";
import { fly } from "svelte/transition";

import Sl from 'svelte-select';
import { onMount } from "svelte";

 function addSample() {
    let oldOrders = $patientTemplate.samples;
    oldOrders.push($sample);
    $patientTemplate.samples =oldOrders;
    resetSample();
}  
  
    onMount(async()=>{
        let getTests = await fetch(`/api/tests?id=${$selectedSampleType.id}`)
        $tests = await getTests.json()
          $sample.sample_type =  $selectedSampleType.id
    })



</script>



<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"  >
    <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" ></div>
  
    <div class="fixed z-10 inset-0 ">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="relative inline-block  bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" transition:fly={{ y: -30 }} on:introstart on:outroend>
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                   
                <svg class="h-10 w-10 "  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#C5CAE9;" d="M512,256.006C512,397.402,397.394,512.004,256.004,512C114.606,512.004,0,397.402,0,256.006
	C-0.007,114.61,114.606,0,256.004,0C397.394,0,512,114.614,512,256.006z"/>
<path style="fill:#9FA8DA;" d="M512,256.005c0-11.647-0.85-23.089-2.356-34.323c-0.129-0.112-0.224-0.257-0.364-0.364
	c-0.442-0.582-154.111-154.251-154.692-154.692c-1.465-1.929-3.675-3.255-6.286-3.255H163.698c-4.436,0-8.026,3.594-8.026,8.026
	c0,2.609,1.326,4.82,3.255,6.286c0.442,0.582,28.838,28.85,28.85,28.865V376.87c0,21.077,7.827,39.439,20.697,52.333
	c0.49,0.524,79.874,79.872,80.38,80.379c0.071,0.076,0.148,0.146,0.221,0.221C414.829,493.578,512,386.187,512,256.005z"/>
<path style="fill:#FFFFFF;" d="M348.301,63.372H163.699c-4.436,0-8.027,3.594-8.027,8.027s3.589,8.027,8.027,8.027h24.079v297.447
	c0,40.907,29.33,71.758,68.223,71.758s68.223-30.851,68.223-71.758V79.424h24.079c4.436,0,8.027-3.594,8.027-8.027
	C356.33,66.964,352.738,63.372,348.301,63.372z M308.171,376.871c0,31.76-22.425,55.706-52.171,55.706s-52.171-23.946-52.171-55.706
	v-80.74h16.052c4.436,0,8.027-3.589,8.027-8.027c0-4.437-3.589-8.027-8.027-8.027h-16.052v-32.105h40.131
	c4.436,0,8.027-3.594,8.027-8.027s-3.589-8.027-8.027-8.027h-40.131v-40.131h16.052c4.436,0,8.027-3.594,8.027-8.027
	s-3.589-8.027-8.027-8.027h-16.052v-32.105h40.131c4.436,0,8.027-3.594,8.027-8.027c0-4.432-3.589-8.027-8.027-8.027h-40.131v-48.15
	h104.34v297.447H308.171z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
                
                
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left   ">
                 <div class="mt-2 inset-0 align-center mb-20 ">
                     <h3 class="text-lg leading-6 font-medium text-gray-900 mb-5" id="modal-title">Add {$selectedSampleType.description} Sample</h3>
                  
                <!-- <Label for='labno' class='block mb-2'>Sample Number</Label>            
                <Input bind:value={$sample.labno} id='labno'></Input>
                 -->
           
                <div class="themed">
                    <Label for='tests' class='block mb-2'>Test</Label>            
                    <Sl items={$tests} bind:value={$sample.tests} isMulti={true} id="tests"></Sl>
                </div>
          
                <div class="themed">
                    <Label for='condition' class='block mb-2'>Condition</Label>            
                    <Sl items={$conditions} bind:value={$sample.condition} isMulti={true} id="condition"></Sl>
                </div>

                <Label for='collection_date' class='block mb-2'>Date Collected</Label>            
                <Input bind:value={$sample.collection_date} id='collection_date' type="datetime-local"></Input>
                
                <Label for='collector' class='block mb-2'>Collected By</Label>            
                <Input bind:value={$sample.collector} id='collector'></Input>
        

                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            <Button  on:click={()=>{$sampleModal=false; addSample()}} >Add</Button>
            <Button outline on:click={()=>{$sampleModal=false;}} >Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .themed {
        --background:  rgb(249 250 251 / var(--tw-bg-opacity));
      --borderRadius: 0.5rem;
      --borderFocusColor:rgb(209 213 219 / var(--tw-border-opacity)) !important;
    outline: none;
    max-width: 350px;
    min-width: 350px;
    }
  </style>