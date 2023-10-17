<script lang="ts">
	import { Alert } from "flowbite-svelte";
import Dashboard from "./components/dashboard.svelte";
import Form from "./components/form/index.svelte";
import {uiForm} from './components/store'

let loading:boolean = false


</script>

<div class="container mx-auto mb-20">
    

    <h1 class="font-medium text-3xl mt-5">Epi-Data</h1>
    <div class="my-5 mx-96">
    </div>
        
    
    {#if $uiForm == 0}
    <Dashboard/>
    {:else}
    <Form/>
    {/if}
</div>
