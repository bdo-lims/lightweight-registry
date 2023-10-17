
<script >
import {  Table , TableBody , TableHeadCell ,TableHead ,TableBodyCell , TableBodyRow ,Button  } from 'flowbite-svelte';
import {  sampleTypes } from '$lib/stores/newOrder';
import { patientTemplate ,smallModal1  }  from '$lib/stores/newOrder';
import { onMount } from 'svelte';



  onMount(async()=>{

let getSampleTypes = await fetch('/api/sample-types')
$sampleTypes = await  getSampleTypes.json()
})

</script>

<!-- 
<div class="relative px-8 pt-6 pb-8 flex flex-col right-0 left-0 " > -->
 
<div class="flex flex-row-reverse m-4">
  <Button on:click={()=>{$smallModal1=true}}>Add Sample</Button>
  </div>


<Table hoverable={true} class="max-w-screen-xl">
    {#if $patientTemplate.samples.length > 0 }
  <TableHead>
    <TableHeadCell></TableHeadCell>
    <TableHeadCell>Tests</TableHeadCell>
    <TableHeadCell>Condition</TableHeadCell>
    <TableHeadCell>Collected on</TableHeadCell>
    <TableHeadCell>Collected by</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
    </TableHeadCell>
  </TableHead>
  <TableBody >
      {#each  $patientTemplate.samples as sample ,indx}
          <TableBodyRow >
            <TableBodyCell >
              {indx+1}
            </TableBodyCell>
            <TableBodyCell class=" "> 
              {#each sample.tests as item,i}
            <div class="tooltip"> <span class="tooltip-trigger">{(item.label).substring(0,32)}{item.label.length > 32 ? '...':''} {@html sample.tests.length == (i+1) ? '' : ',<br>'}</span> <span class="tooltip-drop tooltip-top">{item.label}</span></div>
            {/each}
            </TableBodyCell>
            <TableBodyCell>
              {#each sample.condition as item,i}
                 {item.label }{@html sample.condition.length == (i+1) ? '' : ',<br>'}
              {/each}
            </TableBodyCell>
            <TableBodyCell >
              {sample.collection_date}
            </TableBodyCell>
            <TableBodyCell >
              {sample.collector}              
            </TableBodyCell>
            <TableBodyCell>
             <a href="/" > Edit  </a>            
            </TableBodyCell>
          </TableBodyRow>
      {/each}
    </TableBody>
      {:else}
      <TableHead>
        <TableHeadCell>Tests</TableHeadCell>
        <TableHeadCell>Condition</TableHeadCell>
        <TableHeadCell>Collected on</TableHeadCell>
        <TableHeadCell>Collected by</TableHeadCell>
      </TableHead>
      <TableBody >
      <TableBodyRow>
        <TableBodyCell>No samples yet...</TableBodyCell>
      </TableBodyRow>
    </TableBody>
    {/if}  
</Table>
<style>


.tooltip {
  display: flex;
  align-items: center;
  -moz-column-gap: 0.5rem;
       column-gap: 0.5rem;
  position: relative;
}
.tooltip .tooltip-trigger {
  cursor:help;
}
.tooltip:hover .tooltip-drop {
  opacity: 1;
}
.tooltip:hover .tooltip-drop.tooltip-top{
  transform: translate(-50%, 0);
}
.tooltip .tooltip-drop {
  position: absolute;
  margin-left: 2rem;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  opacity: 0;
  padding: 0.75rem 0.875rem;
  background-color: rgb(26 86 219 / var(--tw-bg-opacity));
  font-size: 0.875rem;
  text-align: left;
  z-index: 1;
  transition: all 0.15s ease-in-out;
  border-radius: 0.188rem;
  color: #fff;
  pointer-events: none;    
  border-radius: 0.5rem;
}
.tooltip .tooltip-drop::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border: 0.375rem solid transparent;
  border-top-color:  rgb(26 86 219 / var(--tw-bg-opacity));
}
.tooltip .tooltip-drop.tooltip-top {
  left: 50%;
  transform: translate(-50%, 0.625rem);
}
.tooltip .tooltip-drop.tooltip-top:before {
  left: 50%;
}
.tooltip .tooltip-drop.tooltip-top {
  bottom: calc(100% + 0.625rem);
}
.tooltip .tooltip-drop.tooltip-top:before {
  top: 100%;
  transform: translate(-50%, 0);
}

</style>