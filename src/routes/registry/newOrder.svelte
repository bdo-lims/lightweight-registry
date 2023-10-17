<script>
	import { onMount } from 'svelte/internal';
	import Title from './components/title.svelte';
	import Toolbar from './components/toolbar.svelte';
    import FormPatient from './components/form-patient.svelte';
	import FormOrder from './components/form-order.svelte';
	import FormSamples from './components/form-samples.svelte';
	import { fly } from 'svelte/transition';
	import { step } from '$lib/stores/orders';
	import NewSample from './components/new-sample.svelte';

	import {Select,   Modal ,Button  } from 'flowbite-svelte';
import {  sampleTypes ,selectedSampleType , sampleModal ,conditions,smallModal1} from '$lib/stores/newOrder';


  onMount(async()=>{
	
let getConditions = await fetch('/api/conditions')
$conditions = await getConditions.json()

  })
  
  </script>


<div class="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true" >

	<div class="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-hidden " />
	<div class="fixed z-10 inset-0 " transition:fly={{ y: 50 }} on:introstart on:outroend>
		<div class="flex items-center justify-center max-h-screen text-center min-w-fit " >
			<!-- This element is to trick the browser into centering the modal contents. -->
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span>



						<div
				class="relative  inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-screen-lg sm:w-full "
			>
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					
					<div class="sm:flex sm:items-start" >
						<Title />
					</div>
					

				{#if $step ==  1  }
					<FormPatient/>
				{:else if $step ==  2 }               
					<FormOrder/>
				{:else if $step  == 3}
				<!--  -->
				<FormSamples/>
				{:else}
				<!--  -->
				{/if}
                    
                    <Toolbar />
				</div>
			</div>
		</div>
	</div>
</div>

{#if $sampleModal}
 <NewSample/>
{/if}
<Modal 
	bind:open={$smallModal1}
	title="Sample Type"
	size='xs'
	>
	
	<Select items={$sampleTypes.map(v=>{return {value:v , name:v.description}})} bind:value={$selectedSampleType}/>
	
	<svelte:fragment slot='footer'>
		<Button on:click={()=>{ $sampleModal = true ; }}>OK</Button>
		<Button color="alternative">Cancel</Button>
	</svelte:fragment>
</Modal>		