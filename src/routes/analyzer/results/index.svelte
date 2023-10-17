<script lang="ts">
  
  import {visible} from "$lib/components/toast"


  import Spinner from '$lib/Spinner.svelte'
    import epi from 'epi-week'; 
    import moment from 'moment';
    import HalfRenRight from './components/half_ren_right.svelte';
    import HalfSplit from './components/46_sample.svelte';
    import E_92 from "./components/e_92.svelte";
    import Rpn_92 from "./components/rpn_92.svelte";
    import {  Button ,ButtonGroup , Card  } from 'flowbite-svelte'
	  import { plate as hr } from './components/half_rr'
    import { plate as s46 } from './components/store-46_samp'
    import { plate as e92 } from './components/store-e92'
    import { plate as rpn } from './components/store-rpn92'
    import {colorMap ,orderMap , selectedResult , colorTemplate} from './store'
    import Modal from './Modal.svelte'; 
    let bgClass = 'inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white first:rounded-l-lg border-t last:rounded-r-md border-l last:border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white focus:ring-0  border-b-4'
    let firstNum = '' 
    let secondNum = ''
    let batchID
    let batchDate = moment().format('YYYY-MM-DD')
    let plateType = '1'
    let loading = false
    let results: Array<any>


function assignResults(){

  Object.values($orderMap).forEach(mapped=>{

    $orderMap[mapped.id].result = $selectedResult
  })

}


 const showToast = ()=> {
        $visible = true;

        setTimeout(()=>{$visible = false;} , 3000
         )   
    }


let testID

async function postOrders(){

let options = {
body: JSON.stringify($orderMap) ,headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method:'PUT'
};

let req = await fetch('/analyzer/results/api/push-results?batch='+ batchID + '&test='+ testID, options)

if(req.ok){
  showToast()
}

}


    async function getBatch (){
      loading = true;

      let req = await fetch('/analyzer/results/api?batch='+ newBacthID)
        if(req.status == 200){

      let batch_Data = await req.json()
      batchID =  newBacthID
      plateType = batch_Data.plate_type
      testID = batch_Data.test_id
      firstNum = batch_Data.a1
      secondNum = batch_Data.a7
      batchData.test = batch_Data.test
      epiWk = batch_Data.epi_week
      batchDate =  moment(batch_Data.batch_date).format('YYYY-MM-DD') 
      results = batch_Data.results
      $orderMap = batch_Data.orders
      loading = false
      blurred = false
      results.forEach((vl ,i) => {
        $colorMap[vl.value] = $colorTemplate[i]
      });
      $selectedResult = results[0].value

    }else{
      
      loading = false;
      popupModal = true;
    }



  }

  let batchData = {
    batch: batchID,
    epiwk:epiWk,
    test:'',
    date:batchDate,
    plateType:plateType,
    a1:firstNum,
    a7:secondNum,
    plate:plate
  }

    $: epiWk = epi(new Date(moment(batchDate).format('YYYY-MM-DD') )).week
    $: plate = plateType=='1'? $hr : plateType=='2'? $s46 : plateType=='3' ? $e92 : $rpn
    $: batchData.batch = batchID 
    $: batchData.epiwk = epiWk
    $: batchData.date = batchDate
    $: batchData.plateType = plateType 
    $: batchData.a1 = firstNum 
    $: batchData.a7 = secondNum
    $: batchData.plate = plate
 


 

let popupModal = false;
let blurred = true;
let newBacthID
</script>
<div class="relative">
  <Modal bind:popupModal bind:newBacthID={newBacthID} functionProp={()=>{getBatch()}} />


</div>

  

  <div class="container mx-auto  sm:px-8">
    
    <div class="py-8">
    <h1 class="inline font-medium text-3xl">Results</h1>
    

    <div class="inline-block mt-2 md:ml-10">
        <Button size='md' class='align-middle' outline  on:click={()=>{popupModal=true}} >Select Batch</Button>
        <Button size='md' class='align-middle ml-4'   on:click={postOrders} >Save</Button>
       

     
 
        </div>        
	<div class="mt-2">
    <Card>
      <h5 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Plate Information</h5>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Batch :   <span class="font-black">{batchID}</span>
       </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
       Plate Type :    
       {#if plateType == '1'} 
       <span class="font-black">Half Ren Right</span>
       {:else if  plateType == '2'}
       <span class="font-black">46 Sample</span>
       {:else if  plateType == '3'}
       <span class="font-black">E 92 Sample</span>
       {:else if  plateType == '4'}
       <span class="font-black">RPN 92 Sample</span>
       {/if}
      </p>
      <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Batch Date :   <span class="font-black">{batchData.date+ " "}</span><span> Epi-Week :   <span class="font-black">{batchData.epiwk}</span></span>
       </p>
       <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
        Test :   <span class="font-black text-sm">{batchData.test}</span>
       </p>
    </Card>
</div>

{#if results}
<div class="mt-4">
  <ButtonGroup>
    {#each results as result}
    
    <Button  on:click={()=>{$selectedResult = result.value}} btnClass={bgClass+ 
    (
      
    $colorMap[result.value] == 'indigo'? ' border-b-blue-500': 
    $colorMap[result.value] == 'emerald'? ' border-b-emerald-500': 
    $colorMap[result.value] == 'amber'? ' border-b-amber-500': 
    $colorMap[result.value] == 'rose'? ' border-b-rose-500': 
    $colorMap[result.value] == 'violet'? ' border-b-violet-500': 
    $colorMap[result.value] == 'sky'? ' border-b-sky-500': 
    $colorMap[result.value] == 'red'? ' border-b-red-500': 
     '' 
    
    )+
    ( 
      result.value == $selectedResult && $colorMap[result.value] == 'indigo' ?  ' bg-blue-200':
      result.value == $selectedResult && $colorMap[result.value] == 'emerald' ?  ' bg-emerald-200':
      result.value == $selectedResult && $colorMap[result.value] == 'amber' ?  ' bg-amber-200':
      result.value == $selectedResult && $colorMap[result.value] == 'rose' ?  ' bg-rose-200':
      result.value == $selectedResult && $colorMap[result.value] == 'violet' ?  ' bg-violet-200':
      result.value == $selectedResult && $colorMap[result.value] == 'sky' ?  ' bg-sky-200':
      result.value == $selectedResult && $colorMap[result.value] == 'red' ?  ' bg-red-200':
      ''
     )} >{result.name}</Button>
    
   
    {/each}
  </ButtonGroup>
  <Button class='align-middle xl:mt-0 mt-2' outline on:click={assignResults} >Mark all</Button>
</div>
{/if}
       <div class="" >
{#if loading}

    <div class=" absolute top-1/2 left-1/3 pl-16 z-10">
      <Spinner />
    </div>

{/if}


        <div class="{blurred==true ?  'blur-sm pointer-events-none select-none' : ''} inline-block my-5 ">
            

            {#if plateType == '1'}
            <HalfRenRight firstNum={secondNum}  />
            {:else if  plateType == '2'}
            <HalfSplit {firstNum} {secondNum} />
            {:else if  plateType == '3'}
            <E_92 {firstNum} />
            {:else if  plateType == '4'}
            <Rpn_92 {firstNum} />
            {/if}
     
        </div>





      </div>
    </div>
  </div>
  