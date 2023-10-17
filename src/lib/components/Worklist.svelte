<script lang="ts">
    
    import { fly  ,blur } from 'svelte/transition';
    import {  Listgroup , ListgroupItem , Popover  } from 'flowbite-svelte'
    export  let active = false
    export  let worklistData : Array<string> = [];
    export let barcode : string
$: if(worklistData.filter((v)=> v.disabled).length == worklistData.length){active = false}

 export let propFunc = ()=>{}

</script>
{#if active && worklistData.filter((v)=> v.disabled).length != worklistData.length }

    <div class="fixed  right-0 top-1/4 shadow-xl  rounded-lg  no-scrollbar" transition:fly="{{ x: 200 }}">
    <Listgroup {active}   class="w-44 ">
        {#each worklistData as item , idx}
      <div class=" bg-transparent border-none" on:click={propFunc}>

            <ListgroupItem on:click={()=>{worklistData[idx].disabled = true; barcode = item.name ; } } bind:current={item.current} bind:disabled={item.disabled} class="font-black {item.disabled == true ? 'hidden':'' }">{item.name}</ListgroupItem>
            <Popover   placement="left" class="w-64 text-sm font-light " title="{item.name}" transition={blur} params={{duration: 500}} >
                <p class="font-medium"><span class="font-black">Patient:</span> {item.patient}</p>  
                <p class="font-medium"><span class="font-black">Test:</span> {item.test}</p> 
             </Popover>

       </div>


        {/each}
    </Listgroup>
         
    </div>  
{/if}

<style>
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
     
    .no-scrollbar {
      -ms-overflow-style: none; 
      scrollbar-width: none; 
      max-height: 55%;
    }
    
    
</style>