<script>
import { orderModal ,step ,getOrder} from "$lib/stores/orders";
import { Button } from 'flowbite-svelte';
import { patientTemplate } from "$lib/stores/newOrder";

import {visible} from "$lib/components/toast"


export async function saveOrder(){

let orderDetails = $patientTemplate

const options = {
    method: 'POST',
    body:`${JSON.stringify(orderDetails)}`
    
};


let pushOrder = await fetch(`./api/create-order`,options)

if(pushOrder.ok){
    $orderModal = false
    getOrder()
    showToast()    
}
} 




const showToast = ()=> {
        $visible = true;

        setTimeout(()=>{$visible = false;} , 3000
         )   
    }


</script>

<div class=" gap-12 flex  flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
    <div>
        <Button outline on:click={()=>{  $orderModal = false ;} } >Cancel</Button>
    </div>

    <div>

        {#if $step ==  1  }
            <Button on:click="{()=>{$step++} }">Next</Button>
        {:else if $step ==  2 }               
            <Button  on:click="{()=>$step--  }">Previous</Button>
            <Button on:click="{()=>{$step++} }">Next</Button>
        {:else if $step  == 3}
            <Button  on:click="{()=>$step--  }">Previous</Button>
            <Button on:click="{saveOrder}">Save</Button>
        {:else}
        <!--  -->
        {/if}
    </div>
</div>