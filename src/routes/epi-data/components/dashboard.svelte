<script lang="ts">
import { onMount } from "svelte";
import  { uiForm , sampleId , testId ,dashData } from './store.js'

let epiData: Array<any> = []

    async function fetchData(){
        
        let req = await fetch('/api/epi')
        epiData = await req.json()
        $dashData =  epiData

    }
    onMount(async()=>{
        await fetchData()

    })
    
//  $: $dashData = epiData

</script>

<div class="mt-5 inline-block min-w-full shadow rounded-lg overflow-hidden">

   {#if $dashData != undefined && $dashData.length > 0}

       <table class="text-left w-full">
        <thead class="flex w-full">
          <tr class="flex w-full">
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Lab Number</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Name</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Batch</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Well</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Test</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full" width="110px"></th>
        </tr>
        </thead>
        <tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style="height:70vh;">
      
    {#each $dashData as order }
          <tr class="flex w-full mb-4">
            <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.labno}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.name}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.batch_no}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.well}</td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.test}</td>
            <td on:click={()=>{$uiForm = order.test_type; $sampleId = order.sample ; $testId = order.test_id}} class="px-5 py-5 text-center border-b border-gray-200 bg-white font-semibold  text-sm  w-full hover:cursor-pointer ">Edit</td>
          </tr>
    {/each} 

        </tbody>
      </table>


       {:else}
       
       <table class="min-w-full leading-normal">
            <thead>
                <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Lab Number</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Name</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Batch</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Well</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Test</th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider" width="110px"></th>
                </tr>
            </thead>
        <tbody>        
            <tr class=" hover:bg-gray-200">
             <td colspan="6" class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm">No orders yet...</td>
            </tr>
        </tbody>
    </table>
       {/if}
       
           
       
</div>