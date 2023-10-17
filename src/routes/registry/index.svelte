<script>
  import { orders , orderModal,step ,getOrder} from '$lib/stores/orders';
  import { resetPatientTemplate }  from '$lib/stores/newOrder';
  import Modal from './newOrder.svelte'
  import { Button} from 'flowbite-svelte';
  export let order
  import moment from 'moment';
  $orders = order
  
  function newOrderPopUp(){
    $step = 1;
    resetPatientTemplate();
    $orderModal = true;
  
  }
  </script>
  
  {#if $orders.length > 0}
  
  <div class="container mx-auto  sm:px-8">
      
      <div class="py-2">
        
    <div class="container">
            
      <h1 class="font-medium text-3xl">Registry</h1>
     
     
  </div>
        <div class="flex gap-2 flex-row-reverse">
       
        <Button on:click={newOrderPopUp}>Add</Button>
        <Button outline on:click={getOrder} >Refresh</Button>
        </div>
        
         <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
  
            <table class="text-left w-full">
              <thead class="flex w-full">
                <tr class="flex w-full">
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Lab Number</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Requested on</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Requested By</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Created By</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider w-full">Site</th>
                  <th class="px-6 py-3 text-center border-b-2 border-gray-200 bg-gray-200  text-xs font-bold text-gray-800 uppercase tracking-wider w-full" >Actions</th>
                </tr>
              </thead>
              <!-- Remove the nasty inline CSS fixed height on production and replace it with a CSS class — this is just for demonstration purposes! -->
              <tbody class="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style="height:70vh;">
             
            
                {#each $orders as order }
                <tr class="flex w-full mb-4">
                  <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full"><a href="https://oe.npesnam.com/OpenELIS-Global/SampleEdit?type=readwrite&accessionNumber={order.labno}" target="_blank">{order.labno}</a></td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{moment(order.request_time,'YYYY-MM-DDTHH:mm').format('DD/MM/YYYY HH:mm')}</td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.requester}</td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.created_by}</td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm  w-full">{order.site}</td>
                  <td class="px-5 py-5 text-center border-b border-gray-200 bg-white font-semibold  text-sm  w-full">Edit</td>
                </tr>
                {/each} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    {:else}
  
    <div class="container mx-auto px-4 sm:px-8">
      
      <div class="py-8">
        
    <div class="container">
            
      <h1 class="font-medium text-3xl my-1">Registry</h1>
  
     
  </div>
        <div class="flex flex-row-reverse gap-2">
        <!-- <button on:click={newOrderPopUp} type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">Add</button> -->
        <Button on:click={newOrderPopUp} >Add</Button>
        <Button outline on:click={getOrder} >Refresh</Button>
        </div>
        
         <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                  
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Lab Number</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Requested on</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Requested By</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Created By</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">Site</th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-200 text-left text-xs font-bold text-gray-800 uppercase tracking-wider" width="110px">Actions</th>
                </tr>
              </thead>
              <tbody>        
                <tr class=" hover:bg-gray-200">
                  <td colspan="6" class="px-5 py-5 border-b border-gray-200 bg-white font-semibold  text-sm">No orders yet...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    {/if}        
  
  
   
  {#if $orderModal }
      
  <Modal/>
  
  {/if}
  