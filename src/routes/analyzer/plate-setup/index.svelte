<script lang="ts">
  import {visible} from "$lib/components/toast"
    import epi from 'epi-week'; 
    import moment from 'moment';
    import HalfRenRight from './components/half_ren_right.svelte';
    import HalfSplit from './components/46_sample.svelte';
    import E_92 from "./components/e_92.svelte";
    import Rpn_92 from "./components/rpn_92.svelte";
    import { Input, Label , ButtonGroup , Button ,Spinner ,Toggle ,Select  } from 'flowbite-svelte'
	  import {  fly } from 'svelte/transition';
    import {Plus , CloudUpload , ArrowLeft, Search , Adjustments , PencilAlt , Newspaper} from 'svelte-heros'
    import { plate as hr } from './components/half_rr'
    import { plate as s46 } from './components/store-46_samp'
    import { plate as e92 } from './components/store-e92'
    import { plate as rpn } from './components/store-rpn92'
    import {selectedField ,orderMap} from './store'
    import { onMount } from 'svelte';
    import Worklist from '$lib/components/Worklist.svelte'
    let active = false
    let firstNum = '' 
    let secondNum = ''
    let batchID: string | undefined
    let batchDate = moment().format('YYYY-MM-DD')
    let plateType = '1'
    let fetchingPat = false
    let checked = true
    let update = false
    let edit = false
    let mapping = false
    let saved = false 
    
    async function fetchBatchID (){
      let req = await fetch('/analyzer/plate-setup/api')
       batchID = (await req.json()).id
    }
    let bsrch

 const showToast = ()=> {
        $visible = true;

        setTimeout(()=>{$visible = false;} , 3000
         )   
    }


    async function postBatch (){

      
      let options = {
    body: JSON.stringify(batchData) ,headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };

      let req = await fetch('/analyzer/plate-setup/api' , options)
      if(req.ok){
     saved = true
     update = true
     getWorklist(batchData.test)
  showToast()
      }        

}
async function putBatch (){

      let NewData = batchData

let options = {
body: JSON.stringify(NewData) ,headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method: 'PUT'
};

let req = await fetch('/analyzer/plate-setup/api' , options)
if(req.ok){
  showToast()
}

}

async function putOrders (dta){

let options = {
body: JSON.stringify(dta) ,headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method: 'PUT'
};

let req = await fetch('/analyzer/plate-setup/api/orders?batch='+ batchID , options)

updateOrders()

}


async function updateOrders(){

let options = {
body: JSON.stringify($orderMap) ,headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
method:'PUT'
};

let req = await fetch('/analyzer/results/api/push-results?batch='+ batchID + '&test='+ batchData.test, options)
if(req.ok){
  
  getWorklist(batchData.test)
  showToast()
}
}

let worklistData : Array<string>

async function getWorklist (tid){

  let req = await fetch('/analyzer/plate-setup/api/worklist?test='+ tid)

  if(req.status == 200){

    let wl = await req.json()
  
   worklistData = wl

}

}

    async function getBatch (){

    let req = await fetch('/analyzer/plate-setup/api?batch='+ batchData.batch)
    // batchData 
    if(req.status == 200){

 let batch_Data = await req.json()
      
      plateType = batch_Data.plate_type
      firstNum = batch_Data.a1
      batchData.test = batch_Data.test
      secondNum = batch_Data.a7
      update = true
      edit =true
      $orderMap = batch_Data.orders

      getWorklist(batchData.test)
    }else{
      update = false
    }



  }
 let batchData = {
    batch: batchID,
    epiwk:epiWk,
    test:null,
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
    
    
  const onKeyPress = e => {
    if (e.charCode === 13){
      fetchPatient()
    }
  };



function nextWell(){
 if($selectedField.column == 12 && $selectedField.iterator == 5){}
 else {
  $selectedField.column = $selectedField.iterator == 7 ? $selectedField.column+1 : $selectedField.column
  $selectedField.iterator = $selectedField.iterator == 7 ? 0 : $selectedField.iterator+1
  $selectedField.id = batchData.plate[$selectedField.iterator]['c'+ String($selectedField.column)]    
  $selectedField.location= batchData.plate[$selectedField.iterator].row +  String($selectedField.column)}
}
 

function prevWell(){
 if($selectedField.column == 7 && $selectedField.iterator == 0){}
 else {
  $selectedField.column = $selectedField.iterator == 0 ? $selectedField.column-1 : $selectedField.column
  $selectedField.iterator = $selectedField.iterator == 0 ? 7 : $selectedField.iterator-1
  $selectedField.id = batchData.plate[$selectedField.iterator]['c'+ String($selectedField.column)]    
  $selectedField.location= batchData.plate[$selectedField.iterator].row +  String($selectedField.column)}
}
  async function fetchPatient(){
    fetchingPat = true
    let req = await fetch('/analyzer/plate-setup/api/patient?labno='+$selectedField.barcode)
    let patient = await req.json()
    if(patient.length > 0){
    $orderMap[`${$selectedField.id}`] = {
                                        
                                        id: $selectedField.id,
                                        barcode:$selectedField.barcode ,
                                        well: $selectedField.location,
                                        order: `${patient[0].order}` ,
                                        patient_id: `${patient[0].patient_id}`,
                                        patient_name: `${patient[0].patient_name}`,
                                        mapped: 'true'
                                      }
                                        fetchingPat = false
                                        if(checked){
                                          nextWell()
                                        }
  
    } else {
    $orderMap[`${$selectedField.id}`] = {
                                        
                                        id: $selectedField.id,
                                        barcode:$selectedField.barcode ,
                                        well: $selectedField.location,
                                        order: '' ,
                                        patient_id: '',
                                        patient_name: '',
                                        mapped:'not found' 
                                        
                                      }  
                                        fetchingPat = false
                                        if(checked){
                                          nextWell()
                                        }
    }
    

}

let testList 
onMount(async()=>{

  let getTest = await fetch('/analyzer/plate-setup/api/test')
  testList = await getTest.json()

})

</script>

                
  

  <div class="container mx-auto  sm:px-8">
    
    <div class="py-8">
      
    <h1 class="inline font-medium text-3xl ">Plate Setup</h1>
    
        <!-- 
             ####                      #### 
             ##                          ##
             ##  PLATE LAYOUT SELECTION  ##
             ##                          ##
             ####                      ####  
                                            -->

    <div class="inline-block mt-2 md:ml-10">
        <ButtonGroup>
                <Button on:click={()=>{plateType = '1'}} class='{plateType == '1' ? 'border-b-4  border-b-blue-500' : '4 border-b-gray-100'} focus:ring-0 hover:border-b-4 hover:border-b-slate-300' >Half Ren Right</Button>
                <Button on:click={()=>{plateType = '2'}} class='{plateType == '2' ? 'border-b-4  border-b-blue-500' : '4 border-b-gray-100'} focus:ring-0 hover:border-b-4 hover:border-b-slate-300' >46 Sample</Button>
                <Button on:click={()=>{plateType = '3'}} class='{plateType == '3' ? 'border-b-4  border-b-blue-500' : '4 border-b-gray-100'} focus:ring-0 hover:border-b-4 hover:border-b-slate-300'>E 92 Sample</Button>
                <Button on:click={()=>{plateType = '4'}} class='{plateType == '4' ? 'border-b-4  border-b-blue-500' : '4 border-b-gray-100'} focus:ring-0 hover:border-b-4 hover:border-b-slate-300'>RPN 92 Sample</Button>
        </ButtonGroup>
           
        </div>
        
        
        <!-- 
             ####                      #### 
             ##                          ##
             ##  PLATE LAYOUT SELECTION  ##
             ##                          ##
             ####                      ####  
                                            -->


        <!-- WORKLIST BUTTON -->


        <!-- {#if update}
        
        <div class="ml-2 inline-block align-middle"> 
          <Button   on:click={()=>active=!active}>
            <Newspaper size='15'/> 
            <span class="pl-1 ">{active == true ? 'Hide ':'Show ' }Worklist</span>
          </Button>
        </div>
        
        {/if} -->
        
        <!-- WORKLIST BUTTON -->

	<div class="">
</div>
      
       <div >

        
        
        <div class="inline-block align-top my-10 mr-10   p-10 border-2 border-gray-100 rounded-lg shadow-xl  ">
            <!-- 
               
               FORM STARTS
               
             -->  
             {#if mapping}
             

        <!-- 
             ####                      #### 
             ##                          ##
             ##       PLATE MAPPING      ##
             ##                          ##
             ####                      ####  
                                            -->


               <div in:fly={{ x: -20, duration: 1000 }} >
                <ArrowLeft on:click={()=>{mapping = false; active =false }}  size='20' class=' cursor-pointer mb-2'/>
              


                  
                <div class="block">
                  <Label for='selected-well' class='block my-2'>Well - {$selectedField.location}</Label>
                  <Input id='selected-well' readonly type='text' size="sm" inputClass="w-full rounded-lg" bind:value={$selectedField.id} />
                </div>


                <div class="block">
                  <Label for='barcode' class='block my-2'>Barcode</Label>
                  <Input id='barcode' on:keypress={onKeyPress} type='text' size="sm" inputClass="w-36 rounded-lg" bind:value={$selectedField.barcode} />
                  <Button bind:this={bsrch} size='sm' on:click={fetchPatient}  class='inline-block ml-2 align-middle' >
                  {#if fetchingPat}
                  <Spinner size="4"/>
                  {:else}
                  <Search size='15'/>
                  {/if}
                  </Button>
               
                </div>

                <div>
                                
                {#if $orderMap[`${$selectedField.id}`] !== undefined}
                  {#if $orderMap[`${$selectedField.id}`].mapped == 'true'}
                  <p class="text-sm font-semibold dark:text-white my-2">{$orderMap[`${$selectedField.id}`].patient_name}</p>
                  <p class="text-sm font-semibold dark:text-white my-2">{$orderMap[`${$selectedField.id}`].barcode}</p>
                  {:else if $orderMap[`${$selectedField.id}`].mapped == 'not found'}
                  <p class="text-sm font-semibold dark:text-white my-2">No order found</p>
                  <p class="text-sm font-semibold dark:text-white my-2">{$orderMap[`${$selectedField.id}`].barcode}</p>
                  {/if}
                
                  {:else}
                  
                  <div class="text-sm font-semibold dark:text-white my-2">&nbsp;</div>
                  <div class="text-sm font-semibold dark:text-white my-2">&nbsp;</div>
                  
                  {/if}
                </div>

                <div class=" mt-4">
                  
                <Toggle size="small" bind:checked >Auto Next </Toggle>
                </div>
                <div class=" mt-5">
                  
                <ButtonGroup>
                        <Button on:click={prevWell}>Prev</Button>
                        <Button  on:click={putOrders($orderMap)}>Save</Button>
                        <Button  on:click={nextWell}>Next</Button>
                 </ButtonGroup>
              
                </div>


               </div>
             
                {:else}
                

        <!-- 
             ####                      #### 
             ##                          ##
             ##         BATCH INFO       ##
             ##                          ##
             ####                      ####  
                                            -->

                          <div in:fly={{ x: 20, duration: 1000 }}>
   <fieldset class="inline-block border-2 border-slate-400  rounded-lg p-2 shadow-md"><legend class="text-sm font-black">Starting Well</legend>
                            
                        {#if plateType == '1'}
                        
                        <div class="inline-block">
                          <label for="second-starting-well" class="text-xs font-semibold">A-7</label>                               
                          <Input id="second-starting-well" type="text" min="0" max="9999" maxlength='4' size="sm" bind:value={secondNum} inputClass="w-16  mx-2 focus:border-blue-500 text-right  rounded-none  rounded-r-md rounded-l-md sm:text-sm border-gray-300" />
                        </div> 
                        {:else if  plateType == '2'}    
                        <div  class="inline-block">
                          <label for="starting-well" class="text-xs font-semibold">A-1</label>                               
                          <Input id="starting-well" type="text" min="0" max="9999" maxlength='4' size="sm" bind:value={firstNum} inputClass="w-16  mx-2 focus:border-blue-500 text-right  rounded-none  rounded-r-md rounded-l-md sm:text-sm border-gray-300" />
                        </div>  
                        
                        <div class="inline-block">
                          <label for="second-starting-well" class="text-xs font-semibold">A-7</label>                               
                          <Input id="second-starting-well" type="text" min="0" max="9999" maxlength='4' size="sm" bind:value={secondNum} inputClass="w-16  mx-2 focus:border-blue-500 text-right  rounded-none  rounded-r-md rounded-l-md sm:text-sm border-gray-300" />
                        </div> 
                        {:else}
                        <div  class="inline-block">
                        <label for="starting-well" class="text-xs font-semibold">A-1</label>                               
                        <Input id="starting-well" type="text" min="0" max="9999" maxlength='4' size="sm" bind:value={firstNum} inputClass="w-16  mx-2 focus:border-blue-500 text-right  rounded-none  rounded-r-md rounded-l-md sm:text-sm border-gray-300" />
                        </div>  
                        {/if} 
                      
                      </fieldset>

                  <div class='my-6 relative'>
                    <div class="block">
                      <Label for='large-input' class='block mb-2'>Batch Number</Label>
                      <Input size="sm" bind:value={batchID} bind:disabled={edit} inputClass="w-22  rounded-lg mb-2" />
                      <div class="inline-block align-middle "> 
                     {#if edit}
                      <Button size='xs' on:click={()=>{edit = false}}  ><PencilAlt size='15' /></Button>
                      {:else}
                      <Button size='xs' on:click={getBatch}  ><Search size='15' /></Button>
                     {/if}
                       
                      </div>
                      <div class="inline-block align-middle "> 
                        <Button size='xs' on:click={fetchBatchID}  ><Plus size='15' /></Button>
                      </div>
                    </div>
                      
                    <div class="inline-block">
                      <Label for='bd' class='block mb-2'>Batch Date</Label>
                      <Input id='bd' type='date' size="sm" inputClass="w-40 rounded-lg" bind:value={batchDate} />
                  </div>
                      <div class="inline-block">
                        <Label for='large-input' class='block mb-2'>Epi-Week</Label>
                        <Input value={epiWk} size="sm" inputClass="w-20 rounded-lg" />
                      </div>
                  </div>
                  <div class="">
                    <Label for='large-input' class=' mb-2'>Select Test
                      <Select class="text-xs mb-4 w-2/3" items={testList} bind:value={batchData.test} />
                    </Label>
                  </div>

                  {#if update}
                  <Button  on:click={putBatch}><CloudUpload size='15'/> <span class="pl-1 ">Update</span> </Button>
                  <Button on:click={()=>{mapping= true; active =true }}><Adjustments size='15'/> <span class="pl-1">Mapping</span> </Button>
                  {:else}
                  <Button class=' w-1/2' on:click={postBatch}><CloudUpload size='15'/> <span class="pl-1 ">Save</span> </Button>
                  {/if}
                 

                          </div>
                   
             {/if}
              <!-- 
   
               FORM ENDS
   
              -->
        </div>


        <div class="inline-block my-5 ">
            

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
  
<Worklist {active} {worklistData} bind:barcode={$selectedField.barcode}  propFunc={fetchPatient} />
