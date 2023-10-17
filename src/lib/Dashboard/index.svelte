<script lang="ts">
	import { onMount } from 'svelte';

    import  { sampCount , 
            total_orders, 
            pending_orders ,
            orders_in_progress 
        }  from './store'
        import {Button , Spinner} from 'flowbite-svelte'

        let firstRun =false
        let loading = false

    async function getDashData(){
    firstRun = true
    loading = true
    let req = await fetch('/api/dashboard')
    if(req.ok){
        let data = await req.json()
            $orders_in_progress = data[0].orders_in_progress
            $pending_orders = data[0].pending_orders
            $sampCount = data[0].sample_orders
            $total_orders = data[0].total_orders
        
            loading =false
        }
        else{
            loading =false
        }
    }

    onMount(()=>{
        if(firstRun){
        }else{
            getDashData()
        }
    }

    )
</script>

<div class="container overflow-y-scroll no-scrollbar mx-auto  shadow-xl dboard rounded-lg  relative ">
        


        <!-- <div class=" border-4 rounded-xl shadow-xl w-60 h-96 sample_types">

            <h1 class="font-black font-mono text-gray-700  text-base text-center">ORDERS BY SAMPLE TYPE</h1>

        </div>  -->
    <div class="inline-block lg:float-right m-4">
        <Button outline bind:disabled={loading}  on:click={getDashData} >
            Refresh {#if loading}
                <span class="ml-2">
                    <Spinner size="4"/>
                </span>
                    {/if}
        </Button>
    </div>

<div class="inline-block xl:absolute ">
    
    <div class="pt-10 pl-10 w-80 max-h-fit overflow-y-scroll no-scrollbar inline-block">
        <h1 class="font-black text-gray-800">ORDERS BY SAMPLE TYPE</h1>
        <ul class="border-r-2 border-slate-200 pr-2">
            {#each $sampCount  as item}
           
        <li class="my-2 font-black text-gray-700 w-full">{item.sample_type} 
            <span class="float-right font-black text-right"> {item.count}</span>
            <span class="float-right w-20 text-center">:</span>   
        </li>   
           
            {/each}

        </ul>



    </div> 

        </div>


        <div class="inline-block ml-10   absolute top-10 lg:left-1/2 xl:left-1/4">
    
            
            <div class="inline-block mb-2  rounded-lg shadow-xl  border-slate-100 border-2 h-24  w-40 text-center top-0">
    
                <p class="p-2 font-black text-4xl">{$orders_in_progress}</p>
                <p class=" font-black text-gray-600">in Progress</p>
    
            </div>
            <div class=" mb-2  inline-block rounded-lg shadow-xl h-24 border-slate-100 border-2 w-40 text-center ">
    
                <p class="p-2 font-black text-4xl">{$pending_orders}</p>
                <p class=" font-black text-gray-600">Pending Orders</p>
    
            </div>
            <div class="inline-block  mb-2 rounded-lg shadow-xl h-24 border-slate-100 border-2 w-40 text-center top-0">
    
                <p class=" p-2 font-black text-4xl">{$total_orders}</p>
                <p class=" font-black text-gray-600">Total Orders</p>
    
            </div>
        </div>
<!--         
        <div class="float-right xl:w-3/4 md:1/2 sm:1/3 mt-20 ">
 
            <div class="inline-block rounded-lg shadow-xl h-20 border-slate-100 border-2 w-40 text-center top-0">

                <p class=" text-2xl">40</p>
                <p class=" font-semibold">Total Orders</p>
  
            </div>
            <div class="inline-block rounded-lg shadow-xl h-20 border-slate-100 border-2 w-40 text-center top-0">

                <p class=" text-2xl">40</p>
                <p class=" font-semibold">Total Orders</p>
  
            </div>
            <div class="inline-block rounded-lg shadow-xl h-20 border-slate-100 border-2 w-40 text-center top-0">

                <p class=" text-2xl">40</p>
                <p class=" font-semibold">Total Orders</p>
  
            </div>

        </div>   -->

</div>


<style>
.dboard{
    height: 80vh;
}


    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
     
    .no-scrollbar {
      -ms-overflow-style: none; 
      scrollbar-width: none; 
    }
     
    
</style>