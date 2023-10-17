
<script>
import {  Input, Label , Button ,Iconinput , Spinner } from 'flowbite-svelte';
import { patientTemplate ,sites ,wards ,providers } from '$lib/stores/newOrder';
import { Qrcode  } from "svelte-heros";
import Sl from 'svelte-select';
import { onMount } from 'svelte';


let fetching = false


  onMount(async()=>{
    if($sites.length == 0){
  let getSites = await fetch('/api/orgs?type=site')
  $sites = await getSites.json()
  }
  
  if($providers.length == 0){
  let geProviders = await fetch('/api/providers')
  $providers = await geProviders.json()
}
  })
  async function genAccession(){

      let getAccession = await fetch('/api/generate-accession')
      
      $patientTemplate.order.labno = await getAccession.text()
      fetching=false
  }


const optionIdentifier = 'id';
  const labelIdentifier = 'name';


/**
 * 
 * @param {number} parent_id
 */
  async function getWards(parent_id){
  let fetchWards = await fetch(`/api/orgs?type=ward&id=${parent_id}`)
  $wards = await fetchWards.json()

}

</script>
<div class="relative px-8 pt-6 pb-8 flex flex-col mt-5  right-0 left-0  " >
  
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <Label for='lab' class='block mb-2'>Lab Number</Label>   
            <div class="relative">       
              <Iconinput noBorder iconClass="h-5 w-5"    id='lab' placeholder="20220000000...."    bind:value={$patientTemplate.order.labno}  >
              <Qrcode/>
              </Iconinput>

             <Button on:click={()=>{fetching=true; genAccession()}}  textSize="text-sm" class=" rounded-l-none absolute  top-0 bottom-0 right-0" type="button"> Generate {#if fetching}
              <div class="ml-2"><Spinner size="5"/></div>
            {/if}</Button>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <Label for='rd' class='block mb-2'>Received Date</Label>            
            <Input id='rd'  type="datetime-local"  bind:value={$patientTemplate.request_time}  />
          </div>
        </div>

        <!--  -->


        
            <div class="-mx-3 md:flex mb-6">
              
              <div class="themed md:w-1/2 px-3 mb-6 md:mb-0">
                <Label for='site' class='block mb-2'>Health Institute</Label>        
                <Sl  {optionIdentifier} {labelIdentifier} on:select={()=> { $patientTemplate.order.ward ='' ;getWards( $patientTemplate.order.site.id)}} on:clear={()=> { $patientTemplate.order.ward ='' ; $wards =[] }} items={$sites} bind:value={$patientTemplate.order.site} isMulti={false} id="site" ></Sl>
            </div>

            </div>

            <div class="-mx-3 md:flex mb-6">
        
                
  
            </div>
            <div class="-mx-3 md:flex mb-6">
              
              <div class="themed md:w-1/2 px-3 mb-6 md:mb-0">
                <Label for='wd' class='block mb-2'>Ward</Label>        
                <Sl  listPlacement="top" {optionIdentifier} {labelIdentifier}  items={$wards} bind:value={ $patientTemplate.order.ward } isMulti={false} id="wd"></Sl>
              </div>
            
              <div class="themed md:w-1/2 px-3 mb-6 md:mb-0">
              <Label for='rb' class='block mb-2'>Requested By</Label>        
              <Sl listPlacement="top" {optionIdentifier} {labelIdentifier}  items={$providers} bind:value={ $patientTemplate.order.requester } isMulti={false} id="rb"></Sl>
            </div>

            </div>

</div>


<style>
  .themed {
      --background:  rgb(249 250 251 / var(--tw-bg-opacity));
    --borderRadius: 0.5rem;
    /* --borderFocusColor:rgb(209 213 219 / var(--tw-border-opacity)) !important; */
  outline: none;
  max-width: 350px;
  min-width: 350px;
  }
</style>
